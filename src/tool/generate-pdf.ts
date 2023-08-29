import { readFile, writeFile } from "node:fs/promises";
import { env } from "node:process";
import puppeteer, { Page } from "puppeteer";
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

const generatePDF = async (
  municipality: string,
  page: Page,
  exportPath: string
): Promise<void> => {
  try {
    console.log(`Generating PDF for ${municipality}`);

    await page.goto(`http://localhost:3000/${municipality}`, {
      waitUntil: "networkidle0",
    });
    const pdf = await page.pdf({ format: "A4" });

    await writeFile(`${exportPath}/${municipality}.pdf`, pdf);
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
