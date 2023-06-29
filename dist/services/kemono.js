"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getByService = exports.getAll = void 0;
const kemono_json_1 = __importDefault(require("./data/kemono.json"));
function getAll(query = "", page = 1, itemsPerPage = 10) {
    const dataStart = (page - 1) * itemsPerPage;
    const dataEnd = dataStart + itemsPerPage;
    let filterData = kemono_json_1.default.sort((a, b) => b.favorited - a.favorited);
    const dataLength = filterData.length;
    const totalPage = Math.ceil(dataLength / itemsPerPage);
    if (page > totalPage) {
        throw new Error("Page are out of range, please check your page number");
    }
    if (query) {
        filterData = kemono_json_1.default.filter((creator) => {
            return (creator.name.toLowerCase().includes(query.toLowerCase()) ||
                creator.id.toLowerCase().includes(query.toLowerCase()) ||
                creator.service.toLowerCase().includes(query.toLowerCase()));
        });
    }
    return filterData.slice(dataStart, dataEnd);
}
exports.getAll = getAll;
function getByService(service, query = "", page = 1, itemsPerPage = 10) {
    const dataStart = (page - 1) * itemsPerPage;
    const dataEnd = dataStart + itemsPerPage;
    let filterData = kemono_json_1.default
        .sort((a, b) => b.favorited - a.favorited)
        .filter((creator) => {
        return creator.service === service;
    });
    const dataLength = filterData.length;
    const totalPage = Math.ceil(dataLength / itemsPerPage);
    if (page > totalPage) {
        throw new Error("Page are out of range, please check your page number");
    }
    if (query) {
        filterData = kemono_json_1.default.filter((creator) => {
            return (creator.name.toLowerCase().includes(query.toLowerCase()) ||
                creator.id.toLowerCase().includes(query.toLowerCase()));
        });
    }
    return filterData.slice(dataStart, dataEnd);
}
exports.getByService = getByService;
function getById(id, service) {
    let filterData = kemono_json_1.default.filter((creator) => creator.service === service && (creator.id === id || creator.name === id));
    return filterData[0];
}
exports.getById = getById;
