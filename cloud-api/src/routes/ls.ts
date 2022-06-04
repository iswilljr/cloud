import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { processPath, markdown2html, sortBy, fromStats } from "../lib";
import { Info, Item, Response } from "../types/ls";
import { dynamicImport } from "tsimportlib";

const router = Router();
const ignore = /node_modules/g;

router.get("/?*", async (req, res, next) => {
	try {
		if (ignore.test(req.path)) throw new Error("Directory can't be accessed");
		const { relativePath, absolutePath } = processPath(req.path);
		const item = await fs.lstat(absolutePath);
		const info: Info = await fromStats(item, relativePath, absolutePath).getInfo();
		const response: Response = { success: true, path: relativePath, data: { info } };
		if (item.isFile()) {
			const { fileTypeFromFile } = (await dynamicImport("file-type", module)) as typeof import("file-type");
			const filetype = await fileTypeFromFile(absolutePath);
			if (path.extname(absolutePath).toLocaleLowerCase() === ".md") {
				response.data.content = { type: "html", data: await markdown2html(absolutePath) };
			} else if (
				item.size > 5242880 ||
				(filetype && (filetype.mime.startsWith("image") || filetype.mime.startsWith("video")))
			) {
				response.data.content = {
					type: "media",
					data: `http://localhost:4000/download${relativePath}`,
					mime: filetype?.mime,
				};
			} else response.data.content = { type: "text", data: await fs.readFile(absolutePath, "utf8") };
			return res.json(response);
		}
		const dir = await fs.opendir(absolutePath);
		const content: { files: Item[]; directories: Item[] } = { files: [], directories: [] };
		for await (const dirItem of dir) {
			if (ignore.test(dirItem.name)) continue;
			const itemPath = path.join(absolutePath, dirItem.name);
			const itemStat = await fs.lstat(itemPath);
			const itemInfo: Item = await fromStats(itemStat, path.join(relativePath, dirItem.name), itemPath).getItem();
			content[dirItem.isDirectory() ? "directories" : "files"].push(itemInfo);
			if (dirItem.name.toLocaleLowerCase() === "readme.md" && info.readme?.name !== "README.md")
				info.readme = { has: true, name: dirItem.name };
		}
		sortBy(content.directories, "name");
		sortBy(content.files, "name");
		if (info.readme?.has)
			info.readme.content = { type: "html", data: await markdown2html(path.join(absolutePath, info.readme.name)) };
		response.data.content = { type: "directory", data: content };
		res.json(response);
	} catch (err) {
		next(err);
	}
});

export default router;
