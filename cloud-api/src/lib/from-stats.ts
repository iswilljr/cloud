import { Stats } from "fs";
import path from "path";
import { getSize } from ".";
import { Info, Item } from "../types/response";
import getFolderSize from "./get-folder-size";

class FromStats {
	#stats: Stats;
	#relative: string;
	#absolute: string;

	constructor(stats: Stats, relative: string, absolute: string) {
		this.#stats = stats;
		this.#relative = relative;
		this.#absolute = absolute;
	}

	async #createItem(): Promise<Item> {
		return {
			id: this.#stats.ino,
			path: this.#relative,
			name: this.#relative === "/" ? "Home" : path.basename(this.#relative),
			isDirectory: this.#stats.isDirectory(),
			isFile: this.#stats.isFile(),
			size: getSize(this.#stats.isFile() ? this.#stats.size : await getFolderSize(this.#absolute)),
			modified: this.#stats.mtimeMs,
			created: this.#stats.birthtimeMs,
		};
	}

	getItem() {
		return this.#createItem();
	}

	async getInfo(): Promise<Info> {
		return { ...(await this.#createItem()), readme: { has: false } };
	}
}

export { FromStats };

export default function (stats: Stats, relative: string, absolute: string) {
	return new FromStats(stats, relative, absolute);
}
