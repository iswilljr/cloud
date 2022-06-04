import { Stats } from "fs";
import path from "path";
import { getSize } from ".";
import { Info, Item } from "../types/ls";
import getFolderSize from "./getFolderSize";

class FromStats {
	#stats: Stats;
	#relative: string;
	#absolute: string;

	constructor(stats: Stats, relative: string, absolute: string) {
		this.#stats = stats;
		this.#relative = relative;
		this.#absolute = absolute;
	}

	async #createItem() {
		const item: Item = {
			id: this.#stats.ino,
			path: this.#relative,
			name: path.basename(this.#relative),
			isDirectory: this.#stats.isDirectory(),
			isFile: this.#stats.isFile(),
			size: getSize(this.#stats.isFile() ? this.#stats.size : await getFolderSize(this.#absolute)),
			modified: this.#stats.mtimeMs,
			created: this.#stats.birthtimeMs,
		};
		return item;
	}

	async getItem(): Promise<Item> {
		return await this.#createItem();
	}

	async getInfo(): Promise<Info> {
		const info: Info = Object.assign({}, await this.#createItem(), {
			readme: this.#stats.isFile() ? null : { has: false, name: "" },
		});
		return info;
	}
}

export default function (stats: Stats, relative: string, absolute: string) {
	return new FromStats(stats, relative, absolute);
}
