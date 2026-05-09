import { Request, Response } from "express";
import { jobService } from "../services/job.service";
import { asyncHandler } from "../middlewares/async-handler";

export const createJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await jobService.createJob(req.body);

  return res.status(201).json({
    success: true,
    message: "Job created successfully",
    job,
  });
});

export const getJobById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!id) {
    throw new Error("Job ID is required");
  }

  const job = await jobService.getJobById(id);

  return res.status(200).json({
    success: true,
    job,
  });
});