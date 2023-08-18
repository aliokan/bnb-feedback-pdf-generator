import Excel, { CellValue } from "exceljs";
import { writeFile } from "node:fs/promises";
import { Row } from "../type/excelRow";
import { ENKey, NLKey, mapping, TranslationMap } from "./mapping";

const inputPath = "./input.xlsx";
const outputPath = "./data.json";

const extractData = async (
  path: string
): Promise<{ headers: Excel.CellValue[]; data: Row[] }> => {
  try {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.worksheets[0]; // get first worksheet

    const columnCount = worksheet.actualColumnCount; // get number of columns
    const rowCount = worksheet.actualRowCount; // get number of rows
    const headers = worksheet.getRow(1).values as CellValue[]; // get header row
    console.log(headers);
    const data = [];
    for (let i = 2; i <= rowCount; i++) {
      const row = (worksheet.getRow(i).values as CellValue[]).reduce(
        (acc, curr, index) => {
          return {
            ...acc,
            ...(headers[index] && { [headers[index] as string]: curr }),
          };
        },
        {} as Row
      );
      data.push(row);
    }

    return { headers, data };
  } catch (error) {
    console.error("Excel file parsing error:", error);
  }
  return { headers: [], data: [] };
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

const formatData = (headers: CellValue[], data: Row[]) => {
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
          return headers.includes(key);
        })
      );
      return Object.fromEntries(filtered);
    });
  } catch (error) {
    console.error("Format data error:", error);
  }
  return [];
};

const main = async () => {
  const { headers, data } = await extractData(inputPath);
  if (!data) return;
  const formated = formatData(headers, data);
  const json = JSON.stringify(formated);
  await saveData(outputPath, json);
};

main();
