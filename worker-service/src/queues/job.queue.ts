import { Worker } from "bullmq";
import { processJob } from "../processors/job.processor";

export const jobWorker = new Worker(
  "job-queue",
  async (job) => {
    await processJob(job.data.jobId);
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  }
);