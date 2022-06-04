import { NextFunction, Request, Response } from "express";
import { manageErr } from "./base";

export const enoent = (err: any, req: Request, res: Response, next: NextFunction) => {
	manageErr(err, {
		code: "ENOENT",
		message: "File or directory does not exist",
		statusCode: 400,
	});
	next(err);
};
