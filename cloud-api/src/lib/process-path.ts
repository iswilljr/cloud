import path from "path";
import storage from "../storage";

function removeLastSeparator(path: string) {
	return path.length > 1 ? path.replace(/\/$/, "") : path;
}

export default function processPath(urlPath: string) {
	const relativePath = urlPath ? decodeURI(urlPath).replace(/\//g, path.sep) : path.sep;
	const absolutePath = path.join(storage ?? "", relativePath);
	if (!absolutePath.startsWith(storage ?? "")) throw new Error("Invalid path");
	return { relativePath: removeLastSeparator(relativePath), absolutePath: removeLastSeparator(absolutePath) };
}
