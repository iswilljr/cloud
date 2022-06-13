import axios, { Response as AxiosResponse } from "redaxios";
import { Response } from "./Response";

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
	async list(url: string = "/"): Promise<Response> {
		return await this.#apiCall<Response>(() => this.#api.get(`/ls${url}`, { params: { noReadme: true } }));
	}
}

const api = new Api(process.env.NEXT_PUBLIC_API_URL);

export const list = async (url: string) => await api.list(url);
