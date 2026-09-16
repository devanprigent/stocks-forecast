import express from "express";
import cors from "cors";
import { json } from "express";
import { performanceRouter } from "./features/routes/performance.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export function buildApp() {
  const app = express();

  app.use(cors());
  app.use(json());

  app.get("/health", (_req, res) => {
    console.log("/health");
    res.json({ status: "ok" });
  });

  app.use("/performance", performanceRouter);
  app.use(errorHandler);

  return app;
}
