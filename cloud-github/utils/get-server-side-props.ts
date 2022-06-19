import { getBlob, getList } from "api";
import { GetServerSideProps } from "next";
import { getPath } from "./get-path";

interface Options {
	type: "list" | "blob";
}

export const createServerSideProps =
	({ type }: Options): GetServerSideProps =>
	async (ctx) => {
		const pathname = getPath(ctx.query?.[type], type === "list");
		const response = await (type === "list" ? getList(pathname) : getBlob(pathname));
		return { props: { pathname, response, type } };
	};
