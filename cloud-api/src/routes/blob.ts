import { Router } from "express";
import fs from "fs/promises";
import { IGNORE } from "../lib/constants";
import { getBlobInfo } from "../lib/get-info";
import mime from "mime-types";

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
			response.content = {
				type: /\.md$/i.test(relativePath) ? "markdown" : "file",
				data: await fs.readFile(absolutePath, "utf8"),
			};
		}

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

export default router;
