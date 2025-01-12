import { Request, Response } from "express";
import { generateShortCode } from "../utils/generateShortCode";
import { UrlModel } from "../models/urlModel";
import fs from "fs";
import path from "path";

const urlsFilePath = path.join(__dirname, "../data/urls.json");

export const createShortUrl = (req: Request, res: Response) => {
  console.log("Received request to /shorten");
  console.log("Request body:", req.body);

  const { originalUrl } = req.body;

  if (!originalUrl || !isValidUrl(originalUrl)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  const shortCode = generateShortCode();
  const newUrl = new UrlModel(originalUrl, shortCode);

  const urls = JSON.parse(fs.readFileSync(urlsFilePath, "utf-8"));
  urls.push(newUrl);
  fs.writeFileSync(urlsFilePath, JSON.stringify(urls, null, 2));

  let baseUrl: string;

  if (req.hostname === "localhost") {
    baseUrl = `http://localhost:${process.env.PORT || 3000}`;
  } else if (req.hostname === "clipp.vercel.app") {
    baseUrl = "https://clipp.vercel.app";
  } else if (req.hostname === "clipp.work") {
    baseUrl = "https://clipp.work";
  } else if (req.hostname === "link-shortner-k5b9.onrender.com") {
    baseUrl = "https://link-shortner-k5b9.onrender.com";
  } else {
    baseUrl = "https://default-url.com"; // Fallback URL
  }
  res.json({
    shortUrl: `${baseUrl}/${shortCode}`,
  });
};

export const redirectUrl = (req: Request, res: Response) => {
  const { shortCode } = req.params;
  const urls = JSON.parse(fs.readFileSync(urlsFilePath, "utf-8"));

  const url = urls.find((u: UrlModel) => u.shortCode === shortCode);

  if (!url) {
    return res.status(404).send("Invalid link");
  }

  const currentTime = new Date().getTime();
  const expirationTime =
    new Date(url.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000;

  if (currentTime > expirationTime) {
    return res.status(410).send("Link expired");
  }

  res.redirect(url.originalUrl);
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
