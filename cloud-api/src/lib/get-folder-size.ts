import fs from "fs/promises";
import { join as joinPaths, basename } from "path";
import { IGNORE } from "./constants";

interface Options {
  ignore?: RegExp;
  ignoreFn?: (itemPath: string) => boolean;
}

async function core(rootItemPath: string, { ignore, ignoreFn }: Options): Promise<number> {
  const fileSizes = new Map();
  const errors = [];

  await processItem(rootItemPath);

  async function processItem(itemPath: string) {
    if (ignore?.test(itemPath) || ignoreFn?.(itemPath)) return;
    const stats = await fs.lstat(itemPath).catch((error) => errors.push(error));
    if (typeof stats !== "object") return;
    fileSizes.set(stats.ino, stats.size);
    if (stats.isDirectory()) {
      const directoryItems = await fs.readdir(itemPath).catch((error) => errors.push(error));
      if (typeof directoryItems !== "object") return;
      await Promise.all(directoryItems.map((directoryItem) => processItem(joinPaths(itemPath, directoryItem))));
    }
  }
  const folderSize: number = Array.from(fileSizes.values()).reduce((total, fileSize) => total + fileSize, 0);
  return folderSize;
}

export default (path: string) =>
  core(path, {
    ignore: IGNORE,
    ignoreFn: (itemPath) => basename(itemPath).startsWith("."),
  });
