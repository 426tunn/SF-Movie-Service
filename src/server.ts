import "dotenv/config";
import express, { Express, Request, Response } from "express";
import csvToJson from "convert-csv-to-json";

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req: Request, res: Response): void => {
  res.render("index");
});

app.get("/places", (req: Request, res: Response): void => {
  const data = csvToJson
    .fieldDelimiter(",")
    .getJsonFromCsv(
      __dirname + "/Film_Locations_in_San_Francisco_20240527.csv",
    );
  res.json(data.slice(0, 100));
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port: ", process.env.PORT);
});
