import { Router } from "express";
import fs from "fs/promises";
import { IGNORE } from "../lib/constants";
import { getBlobInfo } from "../lib/get-info";
import mime from "mime-types";
import md2html from "../lib/md2html";
import path from "path";

const router = Router();

router.get("/?*", async (req, res, next) => {
	try {
		if (IGNORE.test(req.path)) throw new Error("File not found");

		const { relativePath, absolutePath, item, info, response } = await getBlobInfo({ req });

		if (info.isDirectory) throw new Error("File not found");

		const filetype = mime.lookup(absolutePath);
		if (item.size > 5242880 || (filetype && /image|video|audio/.test(filetype))) {
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
