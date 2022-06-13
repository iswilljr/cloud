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

export interface TypeDirectories {
	type: "directory";
	data: {
		files: Item[];
		directories: Item[];
	};
}

export interface BlobInfo extends Item {}

export interface ListInfo extends Item {
	readme: { has: false } | { has: true; name: string; content: string };
}

interface ResponseBase {
	success: true;
	path: string;
	content: TypeDirectories | { type: "file" | "media" | "markdown"; data: string; language?: string };
}

export interface List extends ResponseBase {
	info: ListInfo;
}

export interface Blob extends ResponseBase {
	info: BlobInfo;
}

export interface ResponseFailure {
	success: false;
	message: string;
}

export type ListResponse = List | ResponseFailure;

export type BlobResponse = Blob | ResponseFailure;

export interface ListProps {
	type: "list";
	response: ListResponse;
	pathname: string;
}

export interface BlobProps {
	type: "blob";
	response: BlobResponse;
	pathname: string;
}
