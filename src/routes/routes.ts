import { Express } from "express";
import { createShortUrl, redirectUrl } from "../controllers/urlController";

export function setRoutes(app: Express): void {
  app.post("/shorten", createShortUrl);
  app.get("/:shortCode", redirectUrl);
}
