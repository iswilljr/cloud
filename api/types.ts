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
  success: true;
  path: string;
}

type ListContent = { files: Item[]; directories: Item[] };

export interface ListApiResponse extends ResponseBase {
  content?: ListContent;
  readme: { has: boolean; name?: string; content?: string; message?: "error" | "warn" };
}

export interface ListResponse extends ResponseBase {
  content: ListContent;
  readme: { has: false; message?: "error" | "warn" } | { has: true; name: string; content: string };
}

type BlobContent =
  | { type: "file" | "markdown"; data: string; lines: number; code: string }
  | { type: "media"; data: string };

export interface BlobApiResponse extends ResponseBase {
  content?: BlobContent;
}

export interface BlobResponse extends ResponseBase {
  content: BlobContent;
}

export interface ResponseFailure {
  success: false;
  message: string;
}

export interface ListProps {
  type: "list";
  response: ListResponse | ResponseFailure;
  pathname: string;
}

export interface BlobProps {
  type: "blob";
  response: BlobResponse | ResponseFailure;
  pathname: string;
}
