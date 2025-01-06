"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectUrl = exports.createShortUrl = void 0;
const generateShortCode_1 = require("../utils/generateShortCode");
const urlModel_1 = require("../models/urlModel");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const urlsFilePath = path_1.default.join(__dirname, "../data/urls.json");
const createShortUrl = (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl || !isValidUrl(originalUrl)) {
        return res.status(400).json({ message: "Invalid URL" });
    }
    const shortCode = (0, generateShortCode_1.generateShortCode)();
    const newUrl = new urlModel_1.UrlModel(originalUrl, shortCode);
    const urls = JSON.parse(fs_1.default.readFileSync(urlsFilePath, "utf-8"));
    urls.push(newUrl);
    fs_1.default.writeFileSync(urlsFilePath, JSON.stringify(urls, null, 2));
    res.json({
        shortUrl: `https://link-shortner-k5b9.onrender.com/${shortCode}`,
    });
};
exports.createShortUrl = createShortUrl;
const redirectUrl = (req, res) => {
    const { shortCode } = req.params;
    const urls = JSON.parse(fs_1.default.readFileSync(urlsFilePath, "utf-8"));
    const url = urls.find((u) => u.shortCode === shortCode);
    if (!url) {
        return res.status(404).send("Invalid link");
    }
    const currentTime = new Date().getTime();
    const expirationTime = new Date(url.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000;
    if (currentTime > expirationTime) {
        return res.status(410).send("Link expired");
    }
    res.redirect(url.originalUrl);
};
exports.redirectUrl = redirectUrl;
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
};
