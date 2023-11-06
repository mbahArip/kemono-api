import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

import cors from "cors";
import rateLimit from "express-rate-limit";

import {
  getAll as coomer_getAll,
  getById as coomer_getById,
  getByService as coomer_getByService,
} from "./services/coomer";
import {
  getAll as kemono_getAll,
  getById as kemono_getById,
  getByService as kemono_getByService,
} from "./services/kemono";
import { checkId, search } from "./services/search";
import { Service, ServiceCoomer, ServiceKemono } from "./types/data";

const app: Express = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: true,
});

app.use("/static", express.static("static"));
app.use(cors());
app.use(limiter);
app.use((req: Request, res: Response, next) => {
  if (req.method === "GET") {
    res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  }
  next();
});
app.use((err: any, req: Request, res: Response, next: any) => {
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

app.get("/kemono", async (req: Request, res: Response) => {
  const { itemsPerPage, page, keyword } = req.query;
  try {
    const queryData = {
      itemsPerPage: itemsPerPage ? Number(itemsPerPage as string) : undefined,
      page: page ? Number(page as string) : undefined,
      keyword: (keyword as string) ?? undefined,
    };
    const data = await kemono_getAll(
      queryData.keyword,
      queryData.page,
      queryData.itemsPerPage
    );

    return res.status(200).json({
      message: "OK",
      timestamp: Date.now(),
      currentPage: queryData.page,
      itemsPerPage: queryData.itemsPerPage,
      keyword: queryData.keyword,
      data: data.data,
      pagination: {
        currentPage: queryData.page ?? 1,
        itemsPerPage: queryData.itemsPerPage ?? 10,
        totalPages: Math.ceil(data.length / (queryData.itemsPerPage ?? 10)),
        totalItems: data.length,
        isNextPage: data.length > (queryData.itemsPerPage ?? 10),
        isPrevPage: queryData.page ? queryData.page > 1 : false,
      },
    });
  } catch (error: any) {
    return res.status(error.code).json({
      message: error.message,
      timestamp: Date.now(),
    });
  }
});

app.get("/kemono/:provider", async (req: Request, res: Response) => {
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
      itemsPerPage: itemsPerPage ? Number(itemsPerPage as string) : undefined,
      page: page ? Number(page as string) : undefined,
      keyword: (keyword as string) ?? undefined,
    };
    const data = await kemono_getByService(
      provider as ServiceKemono,
      queryData.keyword,
      queryData.page,
      queryData.itemsPerPage
    );

    return res.status(200).json({
      message: "OK",
      timestamp: Date.now(),
      currentPage: page,
      itemsPerPage: itemsPerPage,
      keyword: keyword,
      data: data.data,
      pagination: {
        currentPage: queryData.page ?? 1,
        itemsPerPage: queryData.itemsPerPage ?? 10,
        totalPages: Math.ceil(data.length / (queryData.itemsPerPage ?? 10)),
        totalItems: data.length,
        isNextPage: data.length > (queryData.itemsPerPage ?? 10),
        isPrevPage: queryData.page ? queryData.page > 1 : false,
      },
    });
  } catch (error: any) {
    return res.json({
      message: error.message,
      timestamp: Date.now(),
    });
  }
});

app.get("/kemono/:provider/:id", async (req: Request, res: Response) => {
  const { id, provider } = req.params;

  try {
    if (!validKemonoProviders.includes(provider.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid provider",
        timestamp: Date.now(),
        availableProviders: validKemonoProviders,
      });
    }
    const data = await kemono_getById(id, provider as ServiceKemono);
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
  } catch (error: any) {
    return res.json({
      message: error.message,
      timestamp: Date.now(),
    });
  }
});

app.get("/coomer", async (req: Request, res: Response) => {
  const { itemsPerPage, page, keyword } = req.query;
  try {
    const queryData = {
      itemsPerPage: itemsPerPage ? Number(itemsPerPage as string) : undefined,
      page: page ? Number(page as string) : undefined,
      keyword: (keyword as string) ?? undefined,
    };
    const data = await coomer_getAll(
      queryData.keyword,
      queryData.page,
      queryData.itemsPerPage
    );

    return res.status(200).json({
      message: "OK",
      timestamp: Date.now(),
      currentPage: queryData.page,
      itemsPerPage: queryData.itemsPerPage,
      keyword: queryData.keyword,
      data: data.data,
      pagination: {
        currentPage: queryData.page ?? 1,
        itemsPerPage: queryData.itemsPerPage ?? 10,
        totalPages: Math.ceil(data.length / (queryData.itemsPerPage ?? 10)),
        totalItems: data.length,
        isNextPage: data.length > (queryData.itemsPerPage ?? 10),
        isPrevPage: queryData.page ? queryData.page > 1 : false,
      },
    });
  } catch (error: any) {
    return res.status(error.code).json({
      message: error.message,
      timestamp: Date.now(),
    });
  }
});

app.get("/coomer/:provider", async (req: Request, res: Response) => {
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
      itemsPerPage: itemsPerPage ? Number(itemsPerPage as string) : undefined,
      page: page ? Number(page as string) : undefined,
      keyword: (keyword as string) ?? undefined,
    };
    const data = await coomer_getByService(
      provider as ServiceCoomer,
      queryData.keyword,
      queryData.page,
      queryData.itemsPerPage
    );

    return res.status(200).json({
      message: "OK",
      timestamp: Date.now(),
      currentPage: page,
      itemsPerPage: itemsPerPage,
      keyword: keyword,
      data: data.data,
      pagination: {
        currentPage: queryData.page ?? 1,
        itemsPerPage: queryData.itemsPerPage ?? 10,
        totalPages: Math.ceil(data.length / (queryData.itemsPerPage ?? 10)),
        totalItems: data.length,
        isNextPage: data.length > (queryData.itemsPerPage ?? 10),
        isPrevPage: queryData.page ? queryData.page > 1 : false,
      },
    });
  } catch (error: any) {
    return res.json({
      message: error.message,
      timestamp: Date.now(),
    });
  }
});

app.get("/coomer/:provider/:id", async (req: Request, res: Response) => {
  const { id, provider } = req.params;

  try {
    if (!validCoomerProviders.includes(provider.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid provider",
        timestamp: Date.now(),
        availableProviders: validCoomerProviders,
      });
    }
    const data = await coomer_getById(id, provider as ServiceCoomer);
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
  } catch (error: any) {
    return res.json({
      message: error.message,
      timestamp: Date.now(),
    });
  }
});

app.get("/search/:keyword", async (req: Request, res: Response) => {
  const { keyword } = req.params;

  try {
    const data = await search(keyword as string);
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
      data: data.data,
    });
  } catch (error: any) {
    return res.json({
      message: error.message,
      timestamp: Date.now(),
    });
  }
});

app.get("/check/:provider/:id", async (req: Request, res: Response) => {
  const { id, provider } = req.params;

  try {
    if (
      !validKemonoProviders.includes(provider.toLowerCase()) &&
      !validCoomerProviders.includes(provider.toLowerCase())
    ) {
      return res.status(400).json({
        message: "Invalid provider",
        timestamp: Date.now(),
        availableProviders: [...validKemonoProviders, ...validCoomerProviders],
      });
    }

    const data = await checkId(id as string, provider as Service);
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
  } catch (error: any) {
    return res.json({
      message: error.message,
      timestamp: Date.now(),
    });
  }
});

app.get("*", (_req: Request, res: Response) => {
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
