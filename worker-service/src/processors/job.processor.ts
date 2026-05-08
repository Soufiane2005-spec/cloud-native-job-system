import { prisma } from "../config/prisma";

export const processJob = async (jobId: string) => {
  console.log(`Processing job: ${jobId}`);

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  await prisma.job.update({
    where: { id: jobId },
    data: {
      status: "PROCESSING",
    },
  });

  const text = (job.payload as any).text;

  const result = {
    wordCount: text.split(" ").length,
    characterCount: text.length,
    uppercase: text.toUpperCase(),
  };

  await prisma.job.update({
    where: { id: jobId },
    data: {
      status: "COMPLETED",
      result,
    },
  });

  console.log(`Completed job: ${jobId}`);
};