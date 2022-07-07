import axios from "axios";
import { token } from "../variables";

async function md2html(markdown: string) {
	const headers = {
		"Content-Type": "text/plain",
		Authorization: `Bearer ${token}`,
	};
	try {
		const html = (await axios.post("https://api.github.com/markdown/raw", markdown, { headers })).data;
		return html.replace(/\n$/, "");
	} catch (error: any) {
		console.log("[-] Something went wrong with md2html, make sure your token is correct");
		console.log(`[-] Token: ${token?.replace(/_.*/g, (str) => "_" + "*".repeat(str.length))}`);
		console.log(`[-] Error: ${error.message}`);
		return false;
	}
}

md2html.highlight = function ({ code, lang }: { code: string; lang: string }) {
	const backtick = "`".repeat(10);
	const markdown = `${backtick}${lang}\n${code.replace(/\/$/, "")}${backtick}`;
	return md2html(markdown);
};

export default md2html;
