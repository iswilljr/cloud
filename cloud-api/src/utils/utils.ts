import { promises as fs, Stats } from "fs";
import path from "path";
import fileSize from "file-size";
import axios from "axios";
import { storage, token } from "../variables";
import type { Item, ResponseBase } from "../types/response";

export function sortBy(arr: object[], key: string) {
  return arr.sort((a: any, b: any) => (a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1));
}

export const getSize = (n: number) => fileSize(n, { fixed: 0 }).human("si");

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
    return (await axios.post("https://api.github.com/markdown/raw", markdown, { headers })).data.replace(/\n$/, "");
  } catch (error: any) {
    console.log("[-] Something went wrong with md2html, make sure your token is correct");
    console.log(`[-] Token: ${token?.replace(/_.*/g, (str) => "_" + "*".repeat(str.length))}`);
    console.log(`[-] Error: ${error.message}`);
  }
}

md2html.highlight = function ({ code, lang }: { code: string; lang: string }) {
  const backtick = "`".repeat(10);
  const markdown = `${backtick}${lang}\n${code.replace(/\/$/, "")}${backtick}`;
  return md2html(markdown);
};

type BasicInfo = {
  response: ResponseBase;
  item: Stats;
  relativePath: string;
  absolutePath: string;
};

export async function getBasicInfo(path: string): Promise<BasicInfo> {
  const { relativePath, absolutePath } = processPath(path);
  const item = await fs.lstat(absolutePath);
  const info = getItem(item, relativePath);
  return { response: { success: true, path: relativePath, info }, item, absolutePath, relativePath };
}
