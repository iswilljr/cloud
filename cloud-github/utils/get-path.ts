export function getPath(path?: string | string[], noInitial: boolean = true): string {
	return Array.isArray(path) ? "/" + (noInitial ? path.slice(1) : path).join("/") : path ?? "/";
}
