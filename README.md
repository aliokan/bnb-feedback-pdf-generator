# BNB Feedback Municipality PDF Generator

This project is a proof of concept for generating PDF files for municipalities.  

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

### Install

```bash
yarn install
```

### Steps to generate PDF

#### 1. extract data from Excel

```bash
yarn extract-data
```

It extract data from `./input.xlsx`, rename field in english snake case and save it in `./data.json`.

#### 2. build CSS

```bash
yarn css:build
```

Build CSS from `./src/styles/index.css` and save it in `./public/styles/style.css`. Inject all Tailwind's components in the CSS. 

#### 3. start server

```bash
yarn start
```

Start Express server on `http://localhost:3000`

#### 4. generate PDF

```bash
yarn generate-pdf
```

Generate PDF from `http://localhost:3000` and save it in `./export/municipalities/{{municipality-name}}/{{municipality-name}}-{{date}}.pdf`.

## Technologies used

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [ts-node](https://typestrong.org/ts-node/)

### To extract data from Excel

- [exceljs](https://github.com/exceljs/exceljs)

### To generate HTML

- [express](https://expressjs.com/)
- [ejs](https://ejs.co/)
- [tailwindcss](https://tailwindcss.com/)

### To generate PDF

- [puppeteer](https://pptr.dev/)

## Troubleshooting

### Error: Unexpected xml node in parseClose: filters

Can be fixed by removing all the filters from the Excel file.
