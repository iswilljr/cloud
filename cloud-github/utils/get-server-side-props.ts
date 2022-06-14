import { getBlob, getList } from "api";
import { GetServerSideProps } from "next";
import { getPath } from "./get-path";

interface Options {
	type: "list" | "blob";
}

export const createServerSideProps = ({ type }: Options): GetServerSideProps => {
	return async (ctx) => {
		const pathname = getPath(ctx.query?.[type], type === "list");
		let response;
		try {
			response = await (type === "list" ? getList(pathname) : getBlob(pathname));
		} catch (error) {
			response = error;
		}
		return { props: { pathname, response, type } };
	};
};
