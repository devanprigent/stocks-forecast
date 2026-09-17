import express from "express";
import cors from "cors";
import { json } from "express";
import { performanceRouter } from "./features/routes/performance.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { ENDPOINTS } from "@stocks-forecast/shared";

export function buildApp() {
  const app = express();

  app.use(cors());
  app.use(json());

  app.get(ENDPOINTS.HEALTH, (_req, res) => {
    console.log(ENDPOINTS.HEALTH);
    res.json({ status: "ok" });
  });

  app.use(ENDPOINTS.FORECAST, performanceRouter);
  app.use(errorHandler);

  return app;
}
