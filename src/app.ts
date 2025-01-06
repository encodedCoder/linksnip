import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { setRoutes } from "./routes";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

setRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
