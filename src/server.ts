import path from "path";
import { readFileSync } from "fs";
import { env } from "process";
import express from "express";
import { MunicipalityData, Vendor } from "./type/formattedType";
import { attributeDescriptions } from "./data/attributeDescription";

const app = express();
const data: MunicipalityData[] = JSON.parse(readFileSync(env.DATA_PATH || `./data.json`).toString());
const vendors: {[key: string]:unknown} = JSON.parse(readFileSync(env.DATA_PATH || `./data-vendors.json`).toString());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
// fonts and icons from ember-appuniversum
app.use(
  "/fonts",
  express.static(
    path.join(
      __dirname,
      "..",
      "node_modules/@appuniversum/ember-appuniversum/public/fonts/"
    )
  )
);
app.use(
  "/icons",
  express.static(
    path.join(
      __dirname,
      "..",
      "node_modules/@appuniversum/ember-appuniversum/public/icons/"
    )
  )
);

app.get("/", (req, res) => {

  res.render("index", {
    title: "FEEDBACK GELINKT PUBLICEREN EN MELDEN",
  });
});

app.get("/municipalities", (req, res) => {
  const municipalities = [
    ...new Set(data.map(({ municipality }) => municipality)),
  ].sort();

  res.render("municipalities/index", {
    title: "FEEDBACK GELINKT PUBLICEREN EN MELDEN",
    municipalities,
  });
});

const renderMunicipality = (
  res: express.Response,
  view: string,
  municipality: string
) => {
  const municipalityDatas = data.filter(
    ({ municipality: municipalityName }) => municipalityName === municipality
  );

  if (municipalityDatas.length === 0) {
    res.status(404).send("Sorry cant find that!");
  } else {
    res.render(view, {
      title: "FEEDBACK GELINKT PUBLICEREN EN MELDEN",
      municipality: municipality,
      attributeDescriptions,
      data: municipalityDatas,
    });
  }
};

app.get("/municipalities/:municipality", (req, res) => {
  renderMunicipality(res, "municipalities/municipality", req.params.municipality);
});

app.get("/municipalities/:municipality/introduction", (req, res) => {
  renderMunicipality(res, "municipalities/introduction", req.params.municipality);
});

app.get("/municipalities/:municipality/tables", (req, res) => {
  renderMunicipality(res, "municipalities/tables", req.params.municipality);
});

app.get("/vendors", (req, res) => {
  res.render("vendors/index", {
    title: "FEEDBACK GELINKT PUBLICEREN EN MELDEN",
    vendors: Vendor,
  });
});

const renderVendor = (
  res: express.Response,
  view: string,
  vendor: Vendor
) => {
  //@ts-ignore
  const vendorName = Vendor[vendor];
  const vendorDatas = vendors[vendorName];

  if (!vendorDatas) {
    res.status(404).send("Sorry cant find that!");
  } else {
    res.render(view, {
      title: "FEEDBACK GELINKT PUBLICEREN EN MELDEN",
      vendor: vendorName,
      attributeDescriptions,
      data: vendorDatas,
    });
  }
};

app.get("/vendors/:vendor", (req, res) => {
  renderVendor(res, "vendors/vendor", req.params.vendor as Vendor);
});

app.get("/vendors/:vendor/introduction", (req, res) => {
  renderVendor(res, "vendors/introduction", req.params.vendor as Vendor);
});

app.get("/vendors/:vendor/tables", (req, res) => {
  renderVendor(res, "vendors/tables", req.params.vendor as Vendor);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
