import Excel, { CellValue } from "exceljs";

type Row = {
    Gemeente?: string;
}

const inputPath = "./input.xlsx";
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

const main = async() => {
    const data = await getData();
    console.log(data);
}

main();