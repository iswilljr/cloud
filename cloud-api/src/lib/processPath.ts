import path from "path";
import storage from "../storage";

export default function processPath(urlPath: string) {
	const relativePath = urlPath ? decodeURI(urlPath).replace(/\//g, path.sep) : path.sep;
	const absolutePath = path.join(storage ?? "", relativePath);
	if (!absolutePath.startsWith(storage ?? "")) throw new Error("Invalid path");
	return { relativePath, absolutePath };
}
