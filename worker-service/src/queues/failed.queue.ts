import {Queue} from "bullmq";

export const failedJobQueue = new Queue("failed-jobs",{
    connection: {
        host: process.env.REDIS_HOST || "redis",
        port: Number(process.env.REDIS_PORT) || 6379,
    },
});