import express from "express";
import path from "path";

const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.render("index", { title: "Home", municipality: "Gent" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
