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

export interface TypeFile {
	type: "text" | "html" | "markdown";
	data: string;
	language: string;
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
			type: "text" | "html" | "markdown";
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
		content: TypeFile | TypeDirectories | TypeMedia;
	};
}

export type Response = ResponseSuccess | ResponseFailure;

export interface DefaultProps {
	response: Response;
	pathname: string;
}
