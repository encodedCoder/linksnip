import { Request, Response } from "express";
import { UrlModel } from "../models/urlModel";
import fs from "fs";
import path from "path";

const urlsFilePath = path.join(__dirname, "../data/urls.json");

export async function createShortUrl(
  req: Request,
  res: Response
): Promise<void> {
  console.log("Received request to /shorten");
  console.log("Request body:", req.body);

  const { originalUrl } = req.body;
  if (!originalUrl) {
    console.error("Error: originalUrl is required");
    res.status(400).json({ message: "originalUrl is required" });
    return;
  }

  if (!isValidUrl(originalUrl)) {
    console.error("Error: Invalid URL format");
    res.status(400).json({ message: "Invalid URL format" });
    return;
  }

  const shortCode = generateShortCode();
  const url = new UrlModel({ originalUrl, shortCode });

  try {
    await url.save();

    let baseUrl: string;
    console.log("Hostname:", req.hostname);

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

    console.log("Base URL:", baseUrl);

    res.json({
      shortenedUrl: `${baseUrl}/${shortCode}`,
    });
  } catch (error) {
    console.error("Error saving URL:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function redirectUrl(req: Request, res: Response): Promise<void> {
  const { shortCode } = req.params;

  try {
    const url = await UrlModel.findOne({ shortCode });
    if (!url) {
      res.status(404).send("Invalid link");
      return;
    }

    const currentTime = new Date().getTime();
    const expirationTime =
      new Date(url.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000;

    if (currentTime > expirationTime) {
      res.status(410).send("Link expired");
      return;
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error retrieving URL:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function generateShortCode(): string {
  return Math.random().toString(36).substring(2, 8);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
