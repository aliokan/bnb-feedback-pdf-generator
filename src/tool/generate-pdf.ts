import { mkdir, readFile, writeFile } from "node:fs/promises";
import { env } from "node:process";
import puppeteer, { Page } from "puppeteer";
import PDFMerger from "pdf-merger-js";
import { MunicipalityData } from "../type/formattedType";
import path from "node:path";

const dataPath = env.DATA_PATH || "./data.json";
const exportPath = env.EXPORT_PATH || "./export";

const getMunicipalityList = async (
  path: string
): Promise<string[] | undefined> => {
  try {
    const json = await readFile(path);
    const data: MunicipalityData[] = JSON.parse(json.toString());
    const municipalities = data
      .map(({ municipality }) => municipality)
      .filter((municipality): municipality is string => !!municipality);
    const deduplicate = [...new Set(municipalities)];

    return deduplicate;
  } catch (error) {
    console.error("JSON file parsing error:", error);
  }
};

const getPDF = async (
  page: Page,
  url: string,
  municipality: string,
  landscape: boolean,
  pagitation: boolean
): Promise<Buffer> => {
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({
    format: "A4",
    landscape,
    displayHeaderFooter: true,
    headerTemplate: `<div style="text-align: end; margin:0 12mm; font-size:6pt !important; width:100%">${municipality}</div>`,
    footerTemplate: pagitation
      ? `<div style="text-align: end; margin:0 12mm; font-size:6pt !important; width:100%"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`
      : "<div></div>",
  });

  return pdf;
};

const generatePDF = async (
  municipality: string,
  page: Page,
  exportPath: string
): Promise<void> => {
  try {
    console.log(`Generating PDF for ${municipality}`);

    const intro = await getPDF(
      page,
      `http://localhost:3000/municipalities/${municipality}/introduction`,
      municipality,
      false,
      false
    );
    const tables = await getPDF(
      page,
      `http://localhost:3000/municipalities/${municipality}/tables`,
      municipality,
      true,
      true
    );

    const pdfMerger = new PDFMerger();
    await pdfMerger.add(intro);
    await pdfMerger.add(tables);
    const pdf = await pdfMerger.saveAsBuffer();

    const municipalityNormalized = municipality.toLowerCase().replace(" ", "-");
    const publicationDate = new Date().toISOString().slice(0, 10);
    const directory = `${exportPath}/municipalities/${municipalityNormalized}`;
    const fileName = `${municipalityNormalized}-${publicationDate}.pdf`;

    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, fileName), pdf);
  } catch (error) {
    console.error("PDF Generation error:", error);
  }
};

const main = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  console.log(dataPath);
  const municipalities = await getMunicipalityList(dataPath);
  console.log(municipalities);

  if (!municipalities) return;

  for (const municipality of municipalities) {
    await generatePDF(municipality, page, exportPath);
  }

  await browser.close();
};

main();
