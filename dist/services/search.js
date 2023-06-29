"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkId = exports.search = void 0;
const kemono_json_1 = __importDefault(require("./data/kemono.json"));
const coomer_json_1 = __importDefault(require("./data/coomer.json"));
function search(id) {
    const kemono = kemono_json_1.default.filter((data) => data.id === id || data.name.toLowerCase().includes(id.toLowerCase()));
    const coomer = coomer_json_1.default.filter((data) => data.id === id || data.name.toLowerCase().includes(id.toLowerCase()));
    let data = [...kemono, ...coomer];
    return data;
}
exports.search = search;
function checkId(id, provider) {
    const kemono = kemono_json_1.default.filter((data) => (data.id === id || data.name === id) && data.service === provider);
    const coomer = coomer_json_1.default.filter((data) => (data.id === id || data.name === id) && data.service === provider);
    let data = [...kemono, ...coomer];
    return data.length ? data[0] : null;
}
exports.checkId = checkId;
