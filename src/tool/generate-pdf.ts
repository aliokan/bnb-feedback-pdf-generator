import { readFile } from "node:fs/promises";
import { env } from "node:process";
import puppeteer, { Page } from "puppeteer";
import PDFMerger from "pdf-merger-js";
import { MunicipalityData } from "../type/formattedType";

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
  landscape: boolean = false
): Promise<Buffer> => {
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({
    format: "A4",
    landscape,
    displayHeaderFooter: true,
    headerTemplate: `<div style="text-align: end; margin:0 12mm; font-size:6pt !important; width:100%">${municipality}</div>`,
    footerTemplate: "<div></div>",
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

    const pdf = new PDFMerger();
    const intro = await getPDF(
      page,
      `http://localhost:3000/${municipality}/introduction`,
      municipality,
      false
    );
    const tables = await getPDF(
      page,
      `http://localhost:3000/${municipality}/tables`,
      municipality,
      true
    );

    await pdf.add(intro);
    await pdf.add(tables);

    await pdf.save(`${exportPath}/${municipality}.pdf`);
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
