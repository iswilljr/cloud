import { NextFunction, Request, Response } from "express";

export const err = (err: any, req: Request, res: Response, next: NextFunction) => {
	console.log("ee");
	res.status(err.statusCode || 404).json({ success: false, message: err.message });
};
