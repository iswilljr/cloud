import { setCookie } from "cookies-next";
import { getBlob, getList } from "api";
import { GetServerSideProps } from "next";
import { getPath } from "./get-path";

interface Options {
  type: "list" | "blob";
}

export const createServerSideProps =
  ({ type }: Options): GetServerSideProps =>
  async ({ query, req, res }) => {
    const pathname = getPath(query?.[type]);
    const response = await (type === "list" ? getList : getBlob)(pathname);
    setCookie("type", type, { path: "/", maxAge: 60 * 60 * 24 * 7, req, res });
    return { props: { pathname, response, type } };
  };
