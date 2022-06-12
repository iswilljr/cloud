import fs from "fs/promises";
import { join as joinPaths } from "path";
import { IGNORE } from "./constants";

/**
 * It recursively traverses a directory and returns the total size of all files in the directory
 * @param rootItemPath - The path to the root item to get the size of.
 * @param ignore - A regular expression that will be used to ignore files and folders.
 * @returns The size of the folder in bytes.
 */
async function core(rootItemPath: string, ignore: RegExp): Promise<number> {
	const fileSizes = new Map();
	const errors = [];

	await processItem(rootItemPath);

	async function processItem(itemPath: string) {
		if (ignore?.test?.(itemPath)) return;
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

export default async (path: string) => await core(path, IGNORE);
