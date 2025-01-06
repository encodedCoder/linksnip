class LinkController {
    private links: Map<string, string> = new Map();

    createShortLink(originalUrl: string): string {
        const shortLink = Math.random().toString(36).substring(2, 8);
        this.links.set(shortLink, originalUrl);
        return shortLink;
    }

    getOriginalLink(shortLink: string): string | null {
        return this.links.get(shortLink) || null;
    }
}

export default LinkController;