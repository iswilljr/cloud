import { useRouter } from "next/router";

export function getPath(path?: string | string[]): string {
  return Array.isArray(path) ? `/${path.join("/")}` : path ? `${path.startsWith("/") ? "" : "/"}${path}` : "/";
}

export function usePath() {
  const router = useRouter();

  const regexp = /\/(deno|github)\/home/;

  return {
    basePath: router.asPath,
    pathname: getPath(router.query.list || router.query.blob),
    listPath: router.asPath.replace(regexp, (_, name) => `/${name}/home`),
    blobPath: router.asPath.replace(regexp, (_, name) => `/${name}/blob`),
    ui: router.asPath.match(/\/(deno|github)\/.*/)?.at(1),
  };
}
