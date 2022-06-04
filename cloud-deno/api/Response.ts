export interface Item {
	id: number;
	path: string;
	name: string;
	isDirectory: boolean;
	isFile: boolean;
	size: string;
	modified: number;
	created: number;
}

export interface TypeText {
	type: "text";
	data: string;
}

export interface TypeHtml {
	type: "html";
	data: string;
}

export interface TypeMedia {
	type: "media";
	data: string;
	mime: string;
}

export interface TypeDirectories {
	type: "directory";
	data: {
		files: Item[];
		directories: Item[];
	};
}

export interface Info extends Item {
	readme: null | {
		has: boolean;
		name: string;
		content: {
			type: "text" | "html";
			data: string;
		};
	};
}

export interface ResponseFailure {
	success: false;
	message: string;
}

export interface ResponseSuccess {
	success: true;
	path: string;
	data: {
		info: Info;
		content: TypeText | TypeHtml | TypeDirectories | TypeMedia;
	};
}
