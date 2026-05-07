import { Certificate } from "node:crypto";
import { jobRepository } from "../repositories/job.repository";
import { CreateJobRequest } from "../types/job.types";

export const jobService =  {
    createJob : async (data: CreateJobRequest) => {
        if (!data.payload?.text || data.payload.text.trim().length === 0){
            throw new Error("Job text is required");
        }
        return jobRepository.create(data);
    },

    getJobById: async (id : string)=>{
        const job = await jobRepository.findById(id);

        if (!job){
            throw new Error("Job not found");
        }
        return job;
    },
};