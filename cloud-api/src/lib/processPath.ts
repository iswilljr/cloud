import path from "path";
import storage from "../storage";

const slash = process.platform === "win32" ? "\\" : "/";

export default function processPath(urlPath: string) {
	const relativePath = urlPath ? decodeURI(urlPath).replace(/\//g, slash) : slash;
	const absolutePath = path.join(storage ?? "", relativePath);
	if (!absolutePath.startsWith(storage ?? "")) throw new Error("Invalid path");
	return { relativePath, absolutePath };
}

