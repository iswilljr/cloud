import axios, { Response as AxiosResponse } from "redaxios";
import { BlobResponse, ListResponse } from "./Response";

class Api {
	#api;
	constructor(url?: string) {
		this.#api = axios.create({ baseURL: url });
	}
	async #apiCall<T>(request: () => Promise<AxiosResponse<T>>) {
		try {
			return (await request()).data;
		} catch (e: any) {
			return e.data;
		}
	}
	async list(url: string): Promise<ListResponse> {
		return await this.#apiCall<ListResponse>(() => this.#api.get(`/ls${url}`));
	}

	async blob(url: string): Promise<BlobResponse> {
		return await this.#apiCall<BlobResponse>(() => this.#api.get(`/blob${url}`));
	}
}

const api = new Api(process.env.NEXT_PUBLIC_API_URL);

export const getList = async (url: string = "/") => await api.list(url);
export const getBlob = async (url: string = "/") => await api.blob(url);
