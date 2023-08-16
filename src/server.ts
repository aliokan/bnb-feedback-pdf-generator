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

app.get("/:municipality", (req, res) => {
  console.log(req.params.municipality);
  const municipalityData = data.find(
    ({ municipality }) => municipality === req.params.municipality
  );

  if (!municipalityData) {
    res.status(404).send("Sorry cant find that!");
  } else {
    res.render("index", {
      title: "FEEDBACK GELINKT PUBLICEREN EN MELDEN",
      municipality: req.params.municipality,
      data: Object.entries(municipalityData),
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
