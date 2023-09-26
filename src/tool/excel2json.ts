import Excel, { CellValue } from "exceljs";
import { writeFile } from "node:fs/promises";
import { Row } from "../type/excelRow";
import { ENKey, NLKey, mapping, TranslationMap } from "./mapping";
import { MunicipalityData, Vendor } from "../type/formattedType";

const inputPath = "./input.xlsx";

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
            ...(headers[index] && {
              [headers[index] as string]: curr?.toString().trim(),
            }),
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

const getPriority = (governingBody: string): string => {
  const priority = governingBody.includes("gemeenteraad")
    ? "1"
    : governingBody.includes("college")
    ? "2"
    : governingBody.includes("burgemeester")
    ? "3"
    : governingBody.includes("vast bureau")
    ? "4"
    : governingBody.includes("ocmw")
    ? "5"
    : governingBody.includes("agb")
    ? "6"
    : "7";

  return priority;
};

const getVendor = (url: string): Vendor | undefined => {
  const vendor = url.includes("cipalschaubroeck.be")
    ? Vendor.CipalSchaubroeck
    : url.includes("https://lblod")
    ? Vendor.Cevi
    : url.includes("onlinesmartcities.be")
    ? Vendor.Greenvalley
    : url.includes("publicatie.gelinkt-notuleren.vlaanderen.be")
    ? Vendor.GelinktNotuleren
    : url.includes("https://tobibus")
    ? Vendor.BCT_Tobania
    : url.includes("meetingburger.net")
    ? Vendor.Remmicom
    : url.includes("powerappsportals.com")
    ? Vendor.C_clear_LB365_Savaco_Thrives
    : url.includes("ebesluit.antwerpen.be")
    ? Vendor.antwerpen
    : undefined;

  return vendor;
};

const typeValue = (
  value: string
): string | number | boolean | null | undefined => {
  if (value === "true") return true;
  else if (value === "false") return false;
  else if (value === "null") return null;
  else if (value === "undefined") return undefined;
  else if (value === "") return undefined;
  else if (!isNaN(Number(value))) return Number(value);
  else return value;
};

const formatData = (headers: CellValue[], data: Row[]): MunicipalityData[] => {
  try {
    return data.map((row, i) => {
      const entries = Object.entries(row);
      const translated = entries.map(([key, value]) => {
        return [translateKey(key as NLKey, mapping), typeValue(value)];
      });
      const filtered = translated.filter(([key]) => !containsList(String(key)));
      console.log(
        "missing translation of",
        `${i}:`,
        filtered.filter(([key]) => {
          return headers.includes(key);
        })
      );

      const governingBody = translated.find(
        ([key]) => key === "governingBody"
      )?.[1] as string;
      filtered.push(["priority", getPriority(governingBody)]);

      const formatedData = Object.fromEntries(filtered) as MunicipalityData;
      const vendor = getVendor(formatedData.url ?? "");

      return {
        ...formatedData,
        vendor,
      };
    });
  } catch (error) {
    console.error("Format data error:", error);
  }
  return [];
};

const sortData = (a: MunicipalityData, b: MunicipalityData) => {
  return a.priority > b.priority ? 1 : -1;
};

function concatValues<T>(value: unknown, accValue: T): T {
  if (accValue === undefined && typeof value === "number") return value as T;
  else if (accValue === undefined) return [value] as T;
  if (typeof accValue === "number" && typeof value === "number") {
    return (accValue + value) as T;
  } else if (Array.isArray(accValue)) {
    return [...accValue, value] as T;
  } else {
    throw new Error("Invalid arguments");
  }
}

const getVendorsData = (data: MunicipalityData[]) => {
  return data.reduce((acc, row) => {
    const vendor = row.vendor;
    if (!vendor) return acc;

    const accVendor = acc[vendor] ?? {};

    const values = Object.entries(row).map(([key, value]) => {
      return [
        key,
        concatValues(value, accVendor[key as keyof MunicipalityData]),
      ];
    });

    return {
      ...acc,
      [vendor]: Object.fromEntries(values),
    };
  }, {} as { [key in Vendor]: MunicipalityData });
};

const main = async () => {
  const { headers, data } = await extractData(inputPath);
  if (!data) return;
  const formated = formatData(headers, data);
  const sorted = formated.sort(sortData);
  // console.log("governingBodies:", JSON.stringify([...new Set(sorted.map((municipality) => municipality.governingBody))]));
  await saveData("./data.json", JSON.stringify(sorted));

  const vendors = getVendorsData(formated);
  await saveData("./data-vendors.json", JSON.stringify(vendors));
};

main();
