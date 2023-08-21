import express from "express";
import { readFileSync } from "fs";
import path from "path";
import { MunicipalityData } from "./type/formattedType";
import { env } from "process";

const app = express();
const json = readFileSync(env.DATA_PATH || `./data.json`);
const data: MunicipalityData[] = JSON.parse(json.toString());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
// fonts and icons from ember-appuniversum
app.use("/fonts", express.static(path.join(__dirname, '..', 'node_modules/@appuniversum/ember-appuniversum/public/fonts/')));
app.use("/icons", express.static(path.join(__dirname, '..', 'node_modules/@appuniversum/ember-appuniversum/public/icons/')));

app.get("/", (req, res) => {
  const municipalities = [... new Set(data.map(
    ({ municipality }) => municipality
  ))].sort();

  res.render("index", {
    title: "FEEDBACK GELINKT PUBLICEREN EN MELDEN",
    municipalities,
  });
});

app.get("/:municipality", (req, res) => {
  console.log(req.params.municipality);
  const municipalityDatas = data.filter(
    ({ municipality }) => municipality === req.params.municipality
  );

  if (municipalityDatas.length === 0) {
    res.status(404).send("Sorry cant find that!");
  } else {
    res.render("municipality", {
      title: "FEEDBACK GELINKT PUBLICEREN EN MELDEN",
      municipality: req.params.municipality,
      data: municipalityDatas,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
