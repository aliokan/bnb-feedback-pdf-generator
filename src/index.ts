import express from "express";
import { readFileSync } from "fs";
import path from "path";

type Row = {
  Gemeente?: string;
};

const app = express();
const json = readFileSync(`../data.json`);
const data: Row[] = JSON.parse(json.toString());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/:municipality", (req, res) => {
  const municipalityData = data.find(
    ({ Gemeente }) => Gemeente === req.params.municipality
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
