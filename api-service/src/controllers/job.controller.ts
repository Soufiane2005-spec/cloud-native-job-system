import { Request, Response } from "express";
import { jobService } from "../services/job.service";

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await jobService.createJob(req.body);

    return res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await jobService.getJobById(req.params.id);

    return res.status(200).json({
      job,
    });
  } catch (error) {
    return res.status(404).json({
      message: error instanceof Error ? error.message : "Job not found",
    });
  }
};