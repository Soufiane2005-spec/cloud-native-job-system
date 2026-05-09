import { NextFunction, Request, Response } from "express";
import {AppError } from "../utils/app-error";
export const errorHandler = (
    error: Error, 
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("ERROR:" , error.message);
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }

return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",

});
}