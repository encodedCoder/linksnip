"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = void 0;
const urlController_1 = require("../controllers/urlController");
function setRoutes(app) {
    app.post("/shorten", urlController_1.createShortUrl);
    app.get("/:shortCode", urlController_1.redirectUrl);
}
exports.setRoutes = setRoutes;
