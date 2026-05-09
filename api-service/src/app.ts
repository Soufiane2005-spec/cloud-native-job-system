import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import jobRoutes from "./routes/job.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/jobs", jobRoutes);

app.use(errorHandler);

export default app;