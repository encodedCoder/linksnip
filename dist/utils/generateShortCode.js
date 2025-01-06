"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortCode = void 0;
const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
};
exports.generateShortCode = generateShortCode;
