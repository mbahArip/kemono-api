"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stringToTFIDF_1 = __importDefault(require("./stringToTFIDF"));
function cosineSimilarity(firstString, secondString, caseSensitive = false, trim = true) {
    let vec1 = firstString;
    let vec2 = secondString;
    if (!caseSensitive) {
        vec1 = vec1.toLowerCase();
        vec2 = vec2.toLowerCase();
    }
    if (trim) {
        vec1 = vec1.trim();
        vec2 = vec2.trim();
    }
    // Strip \r, \n, etc
    vec1 = vec1.replace(/[\r\n]+/gm, "");
    vec1 = (0, stringToTFIDF_1.default)(vec1);
    vec2 = (0, stringToTFIDF_1.default)(vec2);
    let dotProduct = 0;
    let vec1Norm = 0;
    let vec2Norm = 0;
    const vec1Keys = Object.keys(vec1);
    // eslint-disable-next-line no-restricted-syntax
    for (const key of vec1Keys) {
        dotProduct += vec1[key] * vec2[key] || 0;
        vec1Norm += vec1[key] * vec1[key];
        vec2Norm += (vec2[key] || 0) * (vec2[key] || 0);
    }
    return dotProduct / (Math.sqrt(vec1Norm) * Math.sqrt(vec2Norm));
}
exports.default = cosineSimilarity;
