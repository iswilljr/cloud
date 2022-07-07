// This is copied from https://github.com/antoniosarosi/home-cloud/blob/master/server/src/middlewares/err.js

import { Request, Response } from "express";

export const err = (err: any, req: Request, res: Response) => {
  res.status(err.statusCode || 404).json({ success: false, message: err.message });
};
