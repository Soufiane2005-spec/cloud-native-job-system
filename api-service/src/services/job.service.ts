import { jobRepository } from "../repositories/job.repository";
import { CreateJobRequest } from "../types/job.types";
import { jobQueue } from "../queues/job.queue";

export const jobService = {
  createJob: async (data: CreateJobRequest) => {
    if (!data.payload?.text || data.payload.text.trim().length === 0) {
      throw new Error("Job text is required");
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
      throw new Error("Job not found");
    }

    return job;
  },
};