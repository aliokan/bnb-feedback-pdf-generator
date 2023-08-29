import path from "path";
import { readFileSync } from "fs";
import { env } from "process";
import express from "express";
import { MunicipalityData } from "./type/formattedType";
import { attributeDescriptions } from "./data/attributeDescription";

const app = express();
const json = readFileSync(env.DATA_PATH || `./data.json`);
const data: MunicipalityData[] = JSON.parse(json.toString());

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
  const municipalities = [
    ...new Set(data.map(({ municipality }) => municipality)),
  ].sort();

  res.render("index", {
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

app.get("/:municipality", (req, res) => {
  renderMunicipality(res, "municipality-all", req.params.municipality);
});

app.get("/:municipality/introduction", (req, res) => {
  renderMunicipality(res, "municipality-introduction", req.params.municipality);
});

app.get("/:municipality/tables", (req, res) => {
  renderMunicipality(res, "municipality-tables", req.params.municipality);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
