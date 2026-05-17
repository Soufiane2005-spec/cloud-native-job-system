import dotenv from "dotenv";
import { logger } from "./config/logger";

dotenv.config();

import "./queues/job.queue";

logger.info("Worker service is running...");