import { token } from "../variables";

async function md2html(markdown: string) {
	const headers = {
		"Content-Type": "text/plain",
		Authorization: `Bearer ${token}`,
	};
	try {
		const html = await fetch("https://api.github.com/markdown/raw", {
			method: "POST",
			body: markdown,
			headers,
		}).then((r) => r.text());
		return html.replace(/\n$/, "");
	} catch (error: any) {
		console.log("[-] Something went wrong with md2html, make sure your token is correct");
		console.log(`[-] Token: ${token?.replace(/_.*/g, (str) => "_" + "*".repeat(str.length))}`);
		console.log(`[-] Error: ${error.message}`);
		return false;
	}
}

md2html.highlight = function ({ code, lang }: { code: string; lang: string }) {
	const backstics = "`".repeat(10);
	const markdown = `${backstics}${lang}\n${code.replace(/\/$/, "")}${backstics}`;
	return md2html(markdown);
};

export default md2html;
