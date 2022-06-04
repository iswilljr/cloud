import fileSize from "file-size";
import getFolderSize from "./getFolderSize";
import markdown2html from "./markdown2html";
import processPath from "./processPath";
import fromStats from "./FromStats";

export function sortBy(arr: object[], key: string) {
	return arr.sort((a: any, b: any) => (a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1));
}

export function getSize(n: number) {
	return fileSize(n, { fixed: 0 }).human("si");
}

export { getFolderSize, markdown2html, processPath, fromStats };
