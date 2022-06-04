import axios, { AxiosResponse } from "axios";
import { ResponseFailure, ResponseSuccess } from "./Response";

class Api {
	#api;
	constructor(url: string) {
		this.#api = axios.create({ baseURL: url });
	}
	async #apiCall(request: () => Promise<AxiosResponse>) {
		try {
			return (await request()).data;
		} catch (e: any) {
			return e.response.data;
		}
	}
	async list(url: string = "/"): Promise<ResponseSuccess | ResponseFailure> {
		return await this.#apiCall(() => this.#api.get(`/ls${url}`));
	}
}

const api = new Api(process.env.NEXT_PUBLIC_API_URL ?? "");

export const list = async (url: string) => await api.list(url);