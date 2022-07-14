import axios, { Response as AxiosResponse } from "redaxios";
import { BlobResponse, ListResponse } from "./types";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api" });

async function apiCall<T>(request: () => Promise<AxiosResponse<T>>): Promise<T> {
  try {
    return (await request()).data;
  } catch (e: any) {
    return e.data || { success: false, message: "Something went wrong" };
  }
}

export const getList = (url = "/") => apiCall<ListResponse>(() => api.get(`/ls${url}`));

export const getBlob = (url = "/") => apiCall<BlobResponse>(() => api.get(`/blob${url}`));
