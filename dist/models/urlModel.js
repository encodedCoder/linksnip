"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModel = void 0;
class UrlModel {
    constructor(originalUrl, shortCode) {
        this.originalUrl = originalUrl;
        this.shortCode = shortCode;
        this.createdAt = new Date().toISOString();
    }
}
exports.UrlModel = UrlModel;
