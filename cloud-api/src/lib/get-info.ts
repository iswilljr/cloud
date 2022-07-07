import { Request } from "express";
import fs from "fs/promises";
import { BlobResponse, ListResponse } from "../types/response";
import fromStats from "./from-stats";
import processPath from "./process-path";

async function getBasicInfo({ path }: { path: string }) {
  const { relativePath, absolutePath } = processPath(path);
  const item = await fs.lstat(absolutePath);
  const stats = fromStats(item, relativePath, absolutePath);
  const response = { success: true, path: relativePath };
  return {
    relativePath,
    absolutePath,
    item,
    stats,
    response,
  };
}

export async function getListInfo({ req }: { req: Request }) {
  const { relativePath, absolutePath, item, stats, response: res } = await getBasicInfo({ path: req.path });
  const info = await stats.getInfo();
  const response: ListResponse = { ...res, info };
  return {
    relativePath,
    absolutePath,
    item,
    info,
    response,
  };
}

export async function getBlobInfo({ req }: { req: Request }) {
  const { relativePath, absolutePath, item, stats, response: res } = await getBasicInfo({ path: req.path });
  const info = await stats.getItem();
  const response: BlobResponse = { ...res, info };
  return {
    relativePath,
    absolutePath,
    item,
    info,
    response,
  };
}
