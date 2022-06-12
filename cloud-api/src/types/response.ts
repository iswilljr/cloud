export type Item = {
	id: number;
	path: string;
	name: string;
	isDirectory: boolean;
	isFile: boolean;
	size: string;
	modified: number;
	created: number;
};

export type HasReadme = {
	has: true;
	name: string;
	content: string;
};

export type HasNoReadme = {
	has: false;
};

export interface Info extends Item {
	readme: HasReadme | HasNoReadme;
}

export interface Response {
	success: boolean;
	path: string;
	content?: {
		type: "file" | "markdown" | "media" | "directory";
		data: string | { files: Item[]; directories: Item[] };
	};
}

export interface ListResponse extends Response {
	info: Info;
}

export interface BlobResponse extends Response {
	info: Item;
}
