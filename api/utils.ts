import { promises as fs, Stats } from "fs";
import path from "path";
import fileSize from "filesize";
import { storage, token } from "./variables";
import type { Item } from "./types";

export function sortBy(arr: object[], key: string) {
  return arr.sort((a: any, b: any) => (a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1));
}

export const getSize = fileSize.partial({ base: 2, standard: "jedec" });

const removeLastSeparator = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

export function processPath(urlPath: string) {
  const relativePath = urlPath ? decodeURI(urlPath).replace(/\//g, path.sep) : path.sep;
  const absolutePath = path.join(storage ?? "", relativePath);
  return { relativePath: removeLastSeparator(relativePath), absolutePath: removeLastSeparator(absolutePath) };
}

export function getItem(stats: Stats, relative: string): Item {
  return {
    id: stats.ino,
    path: relative,
    name: relative === "/" ? "Home" : path.basename(relative),
    isDirectory: stats.isDirectory(),
    isFile: stats.isFile(),
    size: getSize(stats.size),
    modified: stats.mtimeMs,
    created: stats.birthtimeMs,
  };
}

export async function md2html(markdown: string): Promise<string | undefined> {
  const headers = { "Content-Type": "text/plain", Authorization: `Bearer ${token}` };
  try {
    return await fetch("https://api.github.com/markdown/raw", {
      method: "POST",
      headers,
      body: markdown,
    }).then((res) => res.text());
  } catch (error: any) {
    console.log("[-] Something went wrong with md2html, make sure your token is correct");
    console.log(`[-] Error: ${error.message}`);
  }
}

md2html.highlight = function ({ code, lang }: { code: string; lang: string }) {
  const backtick = "`".repeat(3);
  return md2html(`${backtick}${lang}\n${code.replace(/\/$/, "")}${backtick}`);
};

export async function getBasicInfo(path: string) {
  const { relativePath, absolutePath } = processPath(path);
  const stats = await fs.lstat(absolutePath);
  const item = getItem(stats, relativePath);
  return { response: { success: true, path: relativePath, info: item }, stats, absolutePath, relativePath };
}
