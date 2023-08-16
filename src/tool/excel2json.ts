import Excel, { CellValue } from "exceljs";
import { writeFile } from "node:fs/promises";
import { Row } from "../type/excelRow";
import { ENKey, NLKey, mapping, TranslationMap } from "./mapping";

const inputPath = "./input.xlsx";
const outputPath = "./data.json";

const extractData = async (path: string): Promise<Row[] | undefined> => {
  try {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.worksheets[0]; // get first worksheet

    const columnCount = worksheet.actualColumnCount; // get number of columns
    const rowCount = worksheet.actualRowCount; // get number of rows
    const header = worksheet.getRow(1).values as CellValue[]; // get header row
    const data = [];
    for (let i = 2; i <= rowCount; i++) {
      const row = (worksheet.getRow(i).values as CellValue[]).reduce(
        (acc, curr, index) => {
          return {
            ...acc,
            ...(header[index] && { [header[index] as string]: curr }),
          };
        },
        {} as Row
      );
      data.push(row);
    }

    return data;
  } catch (error) {
    console.error("Excel file parsing error:", error);
  }
};

const saveData = async (path: string, data: string): Promise<void> => {
  try {
    await writeFile(path, data);
  } catch (error) {
    console.error("JSON file saving error:", error);
  }
};

const translateKey = (key: NLKey, translationMap: TranslationMap): ENKey => {
  return (translationMap[key] || key) as ENKey;
};

const containsList = (value: string): boolean => {
  return value.includes("list");
};

const formatData = (data: Row[]) => {
  try {
    return data.map((row, i) => {
      const entries = Object.entries(row);
      const translated = entries.map(([key, value]) => {
        return [translateKey(key as NLKey, mapping), value];
      });
      const filtered = translated.filter(([key]) => !containsList(String(key)));
      console.log(
        "missing translation of",
        `${i}:`,
        filtered.filter(([key]) => {
          return String(key).match(/[\s-]+/g);
        })
      );
      return Object.fromEntries(filtered);
    });
  } catch (error) {
    console.error("Format data error:", error);
  }
};

const main = async () => {
  const data = await extractData(inputPath);
  if (!data) return;
  const formated = formatData(data);
  const json = JSON.stringify(formated);
  await saveData(outputPath, json);
};

main();
