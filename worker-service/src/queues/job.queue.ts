import { Worker } from "bullmq";
import { prisma } from "../config/prisma";
import { processJob } from "../processors/job.processor";

export const jobWorker = new Worker(
  "job-queue",
  async (job) => {
    console.log("Job received from queue:", job.data);

    await processJob(job.data.jobId);
  },
  {
    connection: {
      host: process.env.REDIS_HOST || "redis",
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  }
);

jobWorker.on("completed", (job) => {
  console.log(`Job completed successfully: ${job.id}`);
});

jobWorker.on("failed", async (job, error) => {
  console.error(`Job failed: ${job?.id}`, error.message);

  if (!job) return;

  const jobId = job.data.jobId;

  if (job.attemptsMade >= (job.opts.attempts || 1)) {
    await prisma.job.update({
      where: { id: jobId },
      data: {
        status: "FAILED",
        error: error.message,
      },
    });

    console.error(`Job marked as FAILED in database: ${jobId}`);
  }
});