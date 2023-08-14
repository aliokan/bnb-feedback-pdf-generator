# POC BNB Feedback Municipality PDF Generator

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

### Install

```bash
yarn install
```

### Run

```bash
yarn generate
```

## How to use

### Input files

- `./input.xlsx`: Excel file with the data to be used in the PDF generation.
- `./template.pdf`: PDF template to be used in the PDF generation. 

### Output files

- `export/{{municipality-name}}.pdf`: Generated PDF file.

## Excel file format

The Excel file must have the following columns:
- `Gemeente`: Municipality name.

## Technologies

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [ts-node](https://typestrong.org/ts-node/)
- [exceljs](https://github.com/exceljs/exceljs)
- [pdfme](https://pdfme.com/)

## Troubleshooting

### Error: Unexpected xml node in parseClose: filters

Can be fixed by removing all the filters from the Excel file.

```bash