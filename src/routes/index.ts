import { Express } from "express";
import { createShortUrl, redirectUrl } from "../controllers/urlController";

export function setRoutes(app: Express) {
  app.post("/shorten", createShortUrl);
  app.get("/:shortCode", redirectUrl);
}
