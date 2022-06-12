import fileSize from "file-size";

export function sortBy(arr: object[], key: string) {
	return arr.sort((a: any, b: any) => (a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1));
}

export function getSize(n: number) {
	return fileSize(n, { fixed: 0 }).human("si");
}
