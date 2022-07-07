import { Router } from "express";
import fs from "fs/promises";
import processPath from "../lib/process-path";
import mime from "mime-types";
const router = Router();

router.get("/?*", async (req, res, next) => {
  try {
    const file = processPath(req.url).absolutePath;
    await fs.access(file);
    const mimetype = mime.lookup(file);
    res.setHeader("Content-Disposition", `attachment; filename=${file}`);
    res.setHeader("Content-Type", mimetype || "application/html");
    res.download(file);
  } catch (err) {
    next(err);
  }
});

export default router;
