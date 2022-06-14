import axios, { Response as AxiosResponse } from "redaxios";
import { BlobResponse, ListResponse } from "./Response";

class Api {
	#api;
	constructor(url?: string) {
		this.#api = axios.create({ baseURL: url });
	}

	async #apiCall<T>(request: () => Promise<AxiosResponse<T>>): Promise<T> {
		try {
			return (await request()).data;
		} catch (e: any) {
			return e.data;
		}
	}

	list(url: string = "/") {
		return this.#apiCall<ListResponse>(() => this.#api.get(`/ls${url}`));
	}

	blob(url: string = "/") {
		return this.#apiCall<BlobResponse>(() => this.#api.get(`/blob${url}`));
	}
}

const api = new Api(process.env.NEXT_PUBLIC_API_URL);

export const getList = api.list.bind(api);
export const getBlob = api.blob.bind(api);
