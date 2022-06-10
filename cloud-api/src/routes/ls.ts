import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { processPath, markdown2html, sortBy, fromStats } from "../lib";
import { Info, Item, Response } from "../types/ls";
import { dynamicImport } from "tsimportlib";

const router = Router();
const ignore = /node_modules|\.git/g;

router.get("/?*", async (req, res, next) => {
	try {
		if (ignore.test(req.path)) throw new Error("Directory can't be accessed");

		const { relativePath, absolutePath } = processPath(req.path);
		const noReadme = req.query.noReadme === "true";
		const readmeType = noReadme ? "markdown" : "html";
		const item = await fs.lstat(absolutePath);
		const info: Info = await fromStats(item, relativePath, absolutePath).getInfo();
		const response: Response = { success: true, path: relativePath, data: { info } };

		if (info.isFile) {
			if (path.extname(absolutePath).toLowerCase() === ".md") {
				const data = await (noReadme ? fs.readFile(absolutePath, "utf8") : markdown2html(absolutePath));
				response.data.content = { type: readmeType, data };
			} else {
				const { fileTypeFromFile } = (await dynamicImport("file-type", module)) as typeof import("file-type");
				const filetype = await fileTypeFromFile(absolutePath);
				if (item.size > 5242880 || (filetype && /image|video/.test(filetype.mime))) {
					response.data.content = { type: "media", data: `http://localhost:4000/download${relativePath}` };
				} else {
					const { default: getLang } = (await dynamicImport(
						"filename2prism",
						module
					)) as typeof import("filename2prism");
					response.data.content = {
						type: "text",
						data: await fs.readFile(absolutePath, "utf8"),
						language: getLang(info.name)[0] ?? "",
					};
				}
			}
			return res.json(response);
		}

		const content: { files: Item[]; directories: Item[] } = { files: [], directories: [] };
		for await (const { name } of await fs.opendir(absolutePath)) {
			if (ignore.test(name)) continue;
			const itemPath = path.join(absolutePath, name);
			const itemStat = await fs.lstat(itemPath);
			const itemInfo: Item = await fromStats(itemStat, path.join(relativePath, name), itemPath).getItem();
			content[itemInfo.isDirectory ? "directories" : "files"].push(itemInfo);
			if (name.toLowerCase() === "readme.md" && info.readme?.name !== "README.md") info.readme = { has: true, name };
		}

		sortBy(content.directories, "name");
		sortBy(content.files, "name");

		if (info.readme?.has) {
			const _path = path.join(absolutePath, info.readme.name);
			const data = await (noReadme ? fs.readFile(_path, "utf8") : markdown2html(_path));
			info.readme.content = { type: readmeType, data };
		}

		response.data.content = { type: "directory", data: content };
		res.json(response);
	} catch (err) {
		next(err);
	}
});

export default router;
