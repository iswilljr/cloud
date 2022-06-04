import { NextFunction, Request, Response } from "express";
import { manageErr } from "./base";

export const eexist = (err: any, req: Request, res: Response, next: NextFunction) => {
	manageErr(err, {
		code: "EEXIST",
		message: "Directory already exists",
		statusCode: 400,
	});
	next(err);
};
