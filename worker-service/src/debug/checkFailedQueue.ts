import {Queue} from "bullmq";

const failedJobQueue = new Queue("failed-jobs",{
    connection : {
        host: process.env.REDIS_HOST || "redis",
        port: Number(process.env.REDIS_PORT) || 6379,
    },
});

async function inspectDLQ() {
    const jobs = await failedJobQueue.getJobs();
    console.log("Failed Jobs Queue:");

    for(const job of jobs){
        console.log(job.data);
    }

    process.exit(0);
}

inspectDLQ();