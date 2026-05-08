import dotenv from "dotenv";

dotenv.config();

import "./queues/job.queue";

console.log("Worker service is running...");