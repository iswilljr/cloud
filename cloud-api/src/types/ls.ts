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

export interface Info extends Item {
	readme: null | {
		has: boolean;
		name: string;
		content?: {
			type: "html" | "text";
			data: string;
		};
	};
	content?: {
		type: "html" | "text" | "media";
		data: string;
	};
}

export interface Response {
	success: boolean;
	path: string;
	data: {
		info: Info;
		content?: {
			type: "html" | "text" | "media" | "directory";
			data: string | { files: Item[]; directories: Item[] };
			mime?: string;
		};
	};
}
