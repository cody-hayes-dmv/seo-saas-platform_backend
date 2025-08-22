import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import { router as api } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

export async function createServer() {
  const app = express();
  app.use(helmet());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
  app.use(morgan("dev"));

  app.get("/api/health", (_req, res) => res.json({ ok: true }));

  const swaggerPath = path.join(process.cwd(), "src", "openapi.yaml");
  const swaggerDoc = YAML.parse(fs.readFileSync(swaggerPath, "utf8"));
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.use("/api", api);

  app.use(errorHandler);
  return app;
}
