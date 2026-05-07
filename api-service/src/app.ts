import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import jobRoutes from "./routes/job.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/jobs", jobRoutes);

export default app;