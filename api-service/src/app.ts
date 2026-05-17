import express from "express";
import cors from "cors";
import { register } from "./config/metrics";

import healthRoutes from "./routes/health.routes";
import jobRoutes from "./routes/job.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.use("/health", healthRoutes);
app.use("/jobs", jobRoutes);

app.use(errorHandler);

export default app; 