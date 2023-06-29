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
app.get("/", (_req, res) => {
    return res.status(404).json({
        message: "Path not found",
        availablePaths: [
            "/kemono",
            "/kemono/:provider",
            "/kemono/:provider/:id",
            "/coomer",
            "/coomer/:provider",
            "/coomer/:provider/:id",
            "/search",
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
app.get("/kemono", (req, res) => {
    const { itemsPerPage, page, keyword } = req.query;
    try {
    }
    catch (error) {
        return res.status(error.code).json({
            message: error.message,
        });
    }
    return res.status(200).json({
        message: "OK",
        itemsPerPage: itemsPerPage,
        page: page,
        query: keyword,
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
