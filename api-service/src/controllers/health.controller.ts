import {Request, Response} from "express";

export const healthCheck = (_req: Request, res: Response) => {
return res.status(200).json({
    status: "OK",
    service: "api-service",
    message: "API v2 running on Kubernetes",
});
};