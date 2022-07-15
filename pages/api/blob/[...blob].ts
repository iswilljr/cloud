import { getPath } from "utils/get-path";
import fs from "fs/promises";
import mime from "mime-types";
import path from "path";
import { getBasicInfo, md2html } from "api/utils";
import { IGNORE, token } from "api/variables";
import type { BlobApiResponse } from "api/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const blobPath = getPath(req.query.blob);
    if (IGNORE.test(blobPath)) throw new Error("File not found");

    const { relativePath, absolutePath, response: resBase, stats } = await getBasicInfo(blobPath);
    if (resBase.info.isDirectory) throw new Error("File not found");

    const response: BlobApiResponse = resBase;

    const filetype = mime.lookup(absolutePath);
    if (stats.size > 5242880 || (filetype && /image|video|audio/.test(filetype))) {
      response.content = { type: "media", data: "" };
    } else {
      const isMd = /\.md$/i.test(relativePath);
      const file = await fs.readFile(absolutePath, "utf8");
      const html = await (isMd
        ? md2html(file)
        : md2html.highlight({ code: file, lang: path.extname(relativePath).slice(1) }));
      if (!html) {
        throw new Error(
          token ? "error - could not display file, invalid token" : "warn - could not display file, token is not set"
        );
      }
      response.content = {
        type: isMd ? "markdown" : "file",
        data: html,
        lines: file.replace(/\n$/, "").split("\n").length,
        code: file,
      };
    }

    res.status(200).json(response);
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
}
