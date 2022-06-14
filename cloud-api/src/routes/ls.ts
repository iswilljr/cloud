import { Router } from "express";
import fs from "fs/promises";
import { IGNORE } from "../lib/constants";
import path from "path";
import { sortBy } from "../lib";
import { Item } from "../types/response";
import { getListInfo } from "../lib/get-info";
import fromStats from "../lib/from-stats";

const router = Router();

router.get("/?*", async (req, res, next) => {
	try {
		if (IGNORE.test(req.path)) throw new Error("Directory not found");

		const { relativePath, absolutePath, info, response } = await getListInfo({ req });

		if (info.isFile) throw new Error("Directory not found");

		const content: { files: Item[]; directories: Item[] } = { files: [], directories: [] };
		for await (const { name } of await fs.opendir(absolutePath)) {
			if (IGNORE.test(name)) continue;
			const itemPath = path.join(absolutePath, name);
			const itemStat = await fs.lstat(itemPath);
			const itemInfo: Item = await fromStats(itemStat, path.join(relativePath, name), itemPath).getItem();
			content[itemInfo.isDirectory ? "directories" : "files"].push(itemInfo);
			if (name.toLowerCase() === "readme.md" && info.readme.name !== "README.md") {
				info.readme = { has: true, name, content: "" };
			}
		}

		sortBy(content.directories, "name");
		sortBy(content.files, "name");

		if (info.readme.has && info.readme.name) {
			info.readme.content = await fs.readFile(path.join(absolutePath, info.readme?.name), "utf8");
		}

		response.content = { type: "directory", data: content };
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

export default router;
