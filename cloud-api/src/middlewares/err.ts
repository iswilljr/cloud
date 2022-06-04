import { NextFunction, Request, Response } from "express";

export const err = (err: any, req: Request, res: Response, next: NextFunction) => {
	res.status(err.statusCode || 500).json({ message: err.message, success: !1 });
};
