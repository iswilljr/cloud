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

export interface ResponseBase {
  info: Item;
  success: boolean;
  path: string;
}

export interface ListResponse extends ResponseBase {
  content?: { files: Item[]; directories: Item[] };
  readme: { has: boolean; name?: string; content?: string };
}

export interface BlobResponse extends ResponseBase {
  content?: { type: "file" | "markdown"; data: string; lines: number; code: string } | { type: "media"; data: string };
}

export interface ResponseFailure {
  success: false;
  message: string;
}
