"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const kemono_1 = require("./services/kemono");
const coomer_1 = require("./services/coomer");
const search_1 = require("./services/search");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: true,
});
app.use((0, cors_1.default)());
app.use(limiter);
app.use((req, res, next) => {
    if (req.method === "GET") {
        res.set("Cache-Control", "public, max-age=300, s-maxage=600");
    }
    next();
});
app.use((err, req, res, next) => {
    if (err) {
        return res.status(500).json({
            message: err.message || "Internal server error",
            timestamp: Date.now(),
        });
    }
    next();
});
const validKemonoProviders = [
    "patreon",
    "fanbox",
    "discord",
    "fantia",
    "afdian",
    "boosty",
    "dlsite",
    "gumroad",
    "subscribestar",
];
const validCoomerProviders = ["onlyfans", "fansly"];
app.get("/kemono", (req, res) => {
    var _a;
    const { itemsPerPage, page, keyword } = req.query;
    try {
        const queryData = {
            itemsPerPage: itemsPerPage ? Number(itemsPerPage) : undefined,
            page: page ? Number(page) : undefined,
            keyword: (_a = keyword) !== null && _a !== void 0 ? _a : undefined,
        };
        const data = (0, kemono_1.getAll)(queryData.keyword, queryData.page, queryData.itemsPerPage);
        return res.status(200).json({
            message: "OK",
            timestamp: Date.now(),
            currentPage: queryData.page,
            itemsPerPage: queryData.itemsPerPage,
            keyword: queryData.keyword,
            data: data,
        });
    }
    catch (error) {
        return res.status(error.code).json({
            message: error.message,
            timestamp: Date.now(),
        });
    }
});
app.get("/kemono/:provider", (req, res) => {
    var _a;
    const { provider } = req.params;
    const { itemsPerPage, page, keyword } = req.query;
    try {
        if (!validKemonoProviders.includes(provider.toLowerCase())) {
            return res.status(400).json({
                message: "Invalid provider",
                timestamp: Date.now(),
                availableProviders: validKemonoProviders,
            });
        }
        const queryData = {
            itemsPerPage: itemsPerPage ? Number(itemsPerPage) : undefined,
            page: page ? Number(page) : undefined,
            keyword: (_a = keyword) !== null && _a !== void 0 ? _a : undefined,
        };
        const data = (0, kemono_1.getByService)(provider, queryData.keyword, queryData.page, queryData.itemsPerPage);
        return res.status(200).json({
            message: "OK",
            timestamp: Date.now(),
            currentPage: page,
            itemsPerPage: itemsPerPage,
            keyword: keyword,
            data: data,
        });
    }
    catch (error) {
        return res.json({
            message: error.message,
            timestamp: Date.now(),
        });
    }
});
app.get("/kemono/:provider/:id", (req, res) => {
    const { id, provider } = req.params;
    try {
        if (!validKemonoProviders.includes(provider.toLowerCase())) {
            return res.status(400).json({
                message: "Invalid provider",
                timestamp: Date.now(),
                availableProviders: validKemonoProviders,
            });
        }
        const data = (0, kemono_1.getById)(id, provider);
        if (!data) {
            return res.status(404).json({
                message: "Not found",
                timestamp: Date.now(),
            });
        }
        return res.status(200).json({
            message: "OK",
            timestamp: Date.now(),
            data: data,
        });
    }
    catch (error) {
        return res.json({
            message: error.message,
            timestamp: Date.now(),
        });
    }
});
app.get("/coomer", (req, res) => {
    var _a;
    const { itemsPerPage, page, keyword } = req.query;
    try {
        const queryData = {
            itemsPerPage: itemsPerPage ? Number(itemsPerPage) : undefined,
            page: page ? Number(page) : undefined,
            keyword: (_a = keyword) !== null && _a !== void 0 ? _a : undefined,
        };
        const data = (0, coomer_1.getAll)(queryData.keyword, queryData.page, queryData.itemsPerPage);
        return res.status(200).json({
            message: "OK",
            timestamp: Date.now(),
            currentPage: queryData.page,
            itemsPerPage: queryData.itemsPerPage,
            keyword: queryData.keyword,
            data: data,
        });
    }
    catch (error) {
        return res.status(error.code).json({
            message: error.message,
            timestamp: Date.now(),
        });
    }
});
app.get("/coomer/:provider", (req, res) => {
    var _a;
    const { provider } = req.params;
    const { itemsPerPage, page, keyword } = req.query;
    try {
        if (!validCoomerProviders.includes(provider.toLowerCase())) {
            return res.status(400).json({
                message: "Invalid provider",
                timestamp: Date.now(),
                availableProviders: validCoomerProviders,
            });
        }
        const queryData = {
            itemsPerPage: itemsPerPage ? Number(itemsPerPage) : undefined,
            page: page ? Number(page) : undefined,
            keyword: (_a = keyword) !== null && _a !== void 0 ? _a : undefined,
        };
        const data = (0, coomer_1.getByService)(provider, queryData.keyword, queryData.page, queryData.itemsPerPage);
        return res.status(200).json({
            message: "OK",
            timestamp: Date.now(),
            currentPage: page,
            itemsPerPage: itemsPerPage,
            keyword: keyword,
            data: data,
        });
    }
    catch (error) {
        return res.json({
            message: error.message,
            timestamp: Date.now(),
        });
    }
});
app.get("/coomer/:provider/:id", (req, res) => {
    const { id, provider } = req.params;
    try {
        if (!validCoomerProviders.includes(provider.toLowerCase())) {
            return res.status(400).json({
                message: "Invalid provider",
                timestamp: Date.now(),
                availableProviders: validCoomerProviders,
            });
        }
        const data = (0, coomer_1.getById)(id, provider);
        if (!data) {
            return res.status(404).json({
                message: "Not found",
                timestamp: Date.now(),
            });
        }
        return res.status(200).json({
            message: "OK",
            timestamp: Date.now(),
            data: data,
        });
    }
    catch (error) {
        return res.json({
            message: error.message,
            timestamp: Date.now(),
        });
    }
});
app.get("/search/:id", (req, res) => {
    const { id } = req.params;
    try {
        const data = (0, search_1.search)(id);
        if (!data) {
            return res.status(404).json({
                message: "Not found",
                timestamp: Date.now(),
            });
        }
        return res.status(200).json({
            message: "OK",
            timestamp: Date.now(),
            length: data.length,
            data: data,
        });
    }
    catch (error) {
        return res.json({
            message: error.message,
            timestamp: Date.now(),
        });
    }
});
app.get("/check/:provider/:id", (req, res) => {
    const { id, provider } = req.params;
    try {
        if (!validKemonoProviders.includes(provider.toLowerCase()) &&
            !validCoomerProviders.includes(provider.toLowerCase()) &&
            !validKemonoProviders.includes(provider.toLowerCase())) {
            return res.status(400).json({
                message: "Invalid provider",
                timestamp: Date.now(),
                availableProviders: [...validKemonoProviders, ...validCoomerProviders],
            });
        }
        const data = (0, search_1.checkId)(id, provider);
        if (!data) {
            return res.status(404).json({
                message: "Not found",
                timestamp: Date.now(),
            });
        }
        return res.status(200).json({
            message: "OK",
            timestamp: Date.now(),
            data: data,
        });
    }
    catch (error) {
        return res.json({
            message: error.message,
            timestamp: Date.now(),
        });
    }
});
app.get("*", (_req, res) => {
    return res.status(404).json({
        message: "Path not found",
        availablePaths: [
            "/kemono",
            "/kemono/:provider",
            "/kemono/:provider/:id",
            "/coomer",
            "/coomer/:provider",
            "/coomer/:provider/:id",
            "/search/:id",
            "/search/:name",
            // "/check/:provider/:id",
        ],
        availableServices: {
            kemono: [
                "patreon",
                "fanbox",
                "discord",
                "fantia",
                "afdian",
                "boosty",
                "dlsite",
                "gumroad",
                "subscribestar",
            ],
            coomer: ["onlyfans", "fansly"],
        },
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
