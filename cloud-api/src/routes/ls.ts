import fs from "fs/promises";
import path from "path";
import { Router } from "express";
import { IGNORE } from "../variables";
import { getBasicInfo, getItem, md2html, sortBy } from "../utils/utils";
import type { Item, ListResponse } from "../types/response";

const router = Router();

router.get("/?*", async (req, res, next) => {
  try {
    if (IGNORE.test(req.path)) throw new Error("Directory not found");

    const { relativePath, absolutePath, response: resBase } = await getBasicInfo(req.path);
    if (resBase.info.isFile) throw new Error("Directory not found");

    const response: ListResponse = { ...resBase, readme: { has: false } };

    const content: { files: Item[]; directories: Item[] } = { files: [], directories: [] };
    for await (const { name } of await fs.opendir(absolutePath)) {
      if (name.match(IGNORE)) continue;
      console.log(name);
      const itemInfo = getItem(await fs.lstat(path.join(absolutePath, name)), path.join(relativePath, name));
      content[itemInfo.isDirectory ? "directories" : "files"].push(itemInfo);
      if (name.toLowerCase() === "readme.md" && response.readme.name !== "README.md") {
        response.readme = { has: true, name, content: "" };
      }
    }

    sortBy(content.directories, "name");
    sortBy(content.files, "name");

    if (response.readme.has && response.readme.name) {
      const md = await fs.readFile(path.join(absolutePath, response.readme.name), "utf8");
      const html = await md2html(md);
      response.readme.content = html || "";
    }

    response.content = content;
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

export default router;
