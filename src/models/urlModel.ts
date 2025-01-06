export class UrlModel {
  originalUrl: string;
  shortCode: string;
  createdAt: string;

  constructor(originalUrl: string, shortCode: string) {
    this.originalUrl = originalUrl;
    this.shortCode = shortCode;
    this.createdAt = new Date().toISOString();
  }
}
