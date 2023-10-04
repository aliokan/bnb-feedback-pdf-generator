import { mkdir, readFile, writeFile } from "node:fs/promises";
import { env } from "node:process";
import puppeteer, { Page } from "puppeteer";
import PDFMerger from "pdf-merger-js";
import { MunicipalityData, Vendor } from "../type/formattedType";
import path from "node:path";

const dataPath = env.DATA_PATH || "./data.json";
const dataVendorPath = env.DATA_VENDOR_PATH || "./data-vendors.json";
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

const getVendorList = async (
  path: string
): Promise<string[] | undefined> => {
  try {
    // const json = await readFile(path);
    // const data = JSON.parse(json.toString());

    return Object.keys(Vendor);
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

const generateMunicipalityPDF = async (
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
    const salt = Buffer.from(
      `salty${municipality}`.split("").reverse().join("")
    )
      .toString("base64")
      .slice(0, 5)
      .toLowerCase();
    const directory = `${exportPath}/municipalities/${municipalityNormalized}-${salt}`;
    const fileName = `${municipalityNormalized}-${publicationDate}.pdf`;

    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, fileName), pdf);
  } catch (error) {
    console.error("PDF Generation error:", error);
  }
};

const generateVendorPDF = async (
  vendor: string,
  page: Page,
  exportPath: string
): Promise<void> => {
  try {
    console.log(`Generating PDF for ${vendor}`);

    const vendorBuffer = await getPDF(
      page,
      `http://localhost:3000/vendors/${vendor}`,
      vendor,
      false,
      true
    );

    const pdfMerger = new PDFMerger();
    await pdfMerger.add(vendorBuffer);
    const pdf = await pdfMerger.saveAsBuffer();

    const vendorNormalized = vendor.toLowerCase().replace(/\s+/g, "").replace(/\//g, "-");
    const publicationDate = new Date().toISOString().slice(0, 10);
    const salt = Buffer.from(
      `salty${vendorNormalized}`.split("").reverse().join("")
    )
      .toString("base64")
      .slice(0, 5)
      .toLowerCase();
    const directory = `${exportPath}/vendors/${vendorNormalized}-${salt}`;
    const fileName = `${vendorNormalized}-${publicationDate}.pdf`;

    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, fileName), pdf);
  } catch (error) {
    console.error("PDF Generation error:", error);
  }
};

const generateMunicipalityPDFs = async (
  sourcePath: string,
  page: Page,
  exportPath: string
): Promise<void> => {
  const municipalities = await getMunicipalityList(sourcePath);
  console.log(municipalities);

  if (municipalities) {
    for (const municipality of municipalities) {
      await generateMunicipalityPDF(municipality, page, exportPath);
    }
  }
};

const generateVendorPDFs = async (
  sourcePath: string,
  page: Page,
  exportPath: string
): Promise<void> => {
  const vendors = await getVendorList(sourcePath);
  console.log(vendors);

  if (vendors) {
    for (const vendor of vendors) {
      await generateVendorPDF(vendor, page, exportPath);
    }
  }
};

const main = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  console.log(dataPath);

  // await generateMunicipalityPDFs(dataPath, page, exportPath);
  await generateVendorPDFs(dataVendorPath, page, exportPath);

  await browser.close();
};

main();
