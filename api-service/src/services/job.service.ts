import { jobRepository } from "../repositories/job.repository";
import { CreateJobRequest } from "../types/job.types";
import { jobQueue } from "../queues/job.queue";
import { AppError } from "../utils/app-error";

export const jobService = {
  createJob: async (data: CreateJobRequest) => {
    if (!data.payload?.text || data.payload.text.trim().length === 0) {
      throw new AppError("Job text is required", 400);
    }

    const job = await jobRepository.create(data);

    await jobQueue.add("process-job", {
      jobId: job.id,
    });

    return job;
  },

  getJobById: async (id: string) => {
    const job = await jobRepository.findById(id);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    return job;
  },
};