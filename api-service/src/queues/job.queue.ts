import { Queue } from "bullmq";

export const jobQueue = new Queue("job-queue", {
  connection: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});