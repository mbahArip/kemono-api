"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringToTFIDF(msg) {
    const tokens = msg.replace(/ /g, "").split("");
    const tokenSet = new Set(tokens);
    const termFrequency = {};
    const N = 1;
    const idf = {};
    const tfidf = {};
    for (const token of tokenSet) {
        termFrequency[token] = tokens.filter((t) => t === token).length;
    }
    for (const token of tokenSet) {
        idf[token] = Math.log(N / (tokens.filter((t) => t === token).length + 1));
    }
    for (const token of tokenSet) {
        tfidf[token] = termFrequency[token] * idf[token];
    }
    return tfidf;
}
exports.default = stringToTFIDF;
