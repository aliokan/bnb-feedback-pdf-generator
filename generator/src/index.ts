import { Template, BLANK_PDF} from "@pdfme/common";
import { generate } from "@pdfme/generator";
import Excel, { CellValue } from "exceljs";
import { writeFileSync } from "fs";

type Row = {
    Gemeente?: string;
}

const inputPath = "../input.xlsx";
const exportPath = "../export";

const getData = async ():Promise<Row[] | undefined> => {
  try {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(inputPath);
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

const getTemplate = (): Template => {
  return {
    basePdf: BLANK_PDF,
    schemas: [
      {
        title: {
          type: "text",
          position: { x: 0, y: 0 },
          width: 100,
          height: 10,
        },
      },
    ],
  };
};

const main = async() => {
    const data = await getData();
    const template = getTemplate();
    console.log(data);
    
    await Promise.all(data?.map(async (row) => {
        const municipality = row.Gemeente;
        const inputs:Record<string, string>[] = [{
            title: row.Gemeente || "",
        }]
        const pdf = await generate({template, inputs});
    
        writeFileSync(`${exportPath}/${municipality}.pdf`, pdf);
    
    }) || []);
}

main();