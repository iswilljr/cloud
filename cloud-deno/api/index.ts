import axios, { Response as AxiosResponse } from "redaxios";
import { BlobResponse, ListResponse } from "./Response";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

async function apiCall<T>(request: () => Promise<AxiosResponse<T>>): Promise<T> {
  try {
    return (await request()).data;
  } catch (e: any) {
    return e.data || { success: false, message: "Something went wrong" };
  }
}

export function getList(url = "/") {
  return apiCall<ListResponse>(() => api.get(`/ls${url}`));
}

export function getBlob(url = "/") {
  return apiCall<BlobResponse>(() => api.get(`/blob${url}`));
}
