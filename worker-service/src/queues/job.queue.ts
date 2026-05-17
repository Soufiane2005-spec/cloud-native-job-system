import { Worker } from "bullmq";
import { prisma } from "../config/prisma";
import { logger } from "../config/logger";
import { processJob } from "../processors/job.processor";
import { failedJobQueue } from "./failed.queue";

export const jobWorker = new Worker(
  "job-queue",
  async (job) => {
    logger.info(
      {
        bullmqJobId: job.id,
        jobData: job.data,
      },
      "Job received from queue"
    );

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
  logger.info(
    {
      bullmqJobId: job.id,
      jobId: job.data.jobId,
    },
    "Job completed successfully"
  );
});

jobWorker.on("failed", async (job, error) => {
  logger.error(
    {
      bullmqJobId: job?.id,
      jobId: job?.data?.jobId,
      error: error.message,
      attemptsMade: job?.attemptsMade,
      maxAttempts: job?.opts.attempts,
    },
    "Job processing failed"
  );

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

    await failedJobQueue.add("failed-job", {
      originalJobId: jobId,
      bullmqJobId: job.id,
      error: error.message,
      failedAt: new Date().toISOString(),
      payload: job.data,
    });

    logger.error(
      {
        jobId,
        bullmqJobId: job.id,
        queue: "failed-jobs",
        error: error.message,
      },
      "Job marked as FAILED and moved to DLQ"
    );
  }
});