import fs from "fs/promises";
import path from "path";
import { IGNORE, token } from "api/variables";
import { getBasicInfo, getItem, md2html, sortBy } from "api/utils";
import type { Item, ListApiResponse } from "api/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getPath } from "utils/get-path";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const listPath = getPath(req.query.list);

    if (IGNORE.test(listPath)) throw new Error("Directory not found");

    const { relativePath, absolutePath, response: resBase } = await getBasicInfo(listPath);
    if (resBase.info.isFile) throw new Error("Directory not found");

    const response: ListApiResponse = { ...resBase, readme: { has: false } };

    const content: { files: Item[]; directories: Item[] } = { files: [], directories: [] };
    for await (const { name } of await fs.opendir(absolutePath)) {
      if (name.match(IGNORE)) continue;
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
      if (html) response.readme.content = html;
      else response.readme = { has: false, message: token ? "error" : "warn" };
    }

    response.content = content;
    res.status(200).json(response);
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
}
