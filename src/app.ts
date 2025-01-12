import express from "express";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import { setRoutes } from "./routes";
import { config } from "./config";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI
const { mongoUri, dbName } = config;

mongoose
  .connect(mongoUri, { dbName })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

setRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
