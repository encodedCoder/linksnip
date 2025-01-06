"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LinkController {
    constructor() {
        this.links = new Map();
    }
    createShortLink(originalUrl) {
        const shortLink = Math.random().toString(36).substring(2, 8);
        this.links.set(shortLink, originalUrl);
        return shortLink;
    }
    getOriginalLink(shortLink) {
        return this.links.get(shortLink) || null;
    }
}
exports.default = LinkController;
