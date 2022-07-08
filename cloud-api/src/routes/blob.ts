import { Router } from "express";
import fs from "fs/promises";
import mime from "mime-types";
import path from "path";
import { BlobResponse } from "../types/response.js";
import { getBasicInfo, md2html } from "../utils.js";
import { IGNORE } from "../variables.js";

const router = Router();

router.get("/?*", async (req, res, next) => {
  try {
    if (IGNORE.test(req.path)) throw new Error("File not found");

    const { relativePath, absolutePath, response: resBase, stats } = await getBasicInfo(req.path);
    if (resBase.info.isDirectory) throw new Error("File not found");

    const response: BlobResponse = resBase;

    const filetype = mime.lookup(absolutePath);
    if (stats.size > 5242880 || (filetype && /image|video|audio/.test(filetype))) {
      response.content = { type: "media", data: `http://localhost:4000/download${relativePath}` };
    } else {
      const isMd = /\.md$/i.test(relativePath);
      const file = await fs.readFile(absolutePath, "utf8");
      const html = await (isMd
        ? md2html(file)
        : md2html.highlight({ code: file, lang: path.extname(relativePath).slice(1) }));
      response.content = {
        type: isMd ? "markdown" : "file",
        data: html || "",
        lines: file.replace(/\n$/, "").split("\n").length,
        code: file,
      };
    }

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

export default router;
