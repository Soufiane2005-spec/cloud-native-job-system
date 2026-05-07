import { prisma } from "../config/prisma";
import { CreateJobRequest } from "../types/job.types";

export const jobRepository = {
  create: async (data: CreateJobRequest) => {
    return prisma.job.create({
      data: {
        type: data.type,
        payload: data.payload,
        status: "PENDING",
      },
    });
  },

  findById: async (id: string) => {
    return prisma.job.findUnique({
      where: { id },
    });
  },
};