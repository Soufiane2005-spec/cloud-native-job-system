import client from "prom-client";

export const register = new client.Registry();

client.collectDefaultMetrics({
    register,
});

export const jobsCreatedCounter = new client.Counter({
    name : "jobs_created_total",
    help: "Total number of jobs created",
});

register.registerMetric(jobsCreatedCounter);