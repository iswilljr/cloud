import fs from "fs/promises";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";

const markdown: MarkdownIt = MarkdownIt({
	html: true,
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return (
					'<pre><code class="highlight">' +
					hljs.highlightAuto(
						str
						// {
						// language: lang,
						// ignoreIllegals: true,
						// }
					).value +
					"</code></pre>"
				);
			} catch (__) {}
		}
		return '<pre><code class="highlight">' + markdown.utils.escapeHtml(str) + "</code></pre>";
	},
	xhtmlOut: true,
});

export default async function markdown2html(path: string) {
	const content = await fs.readFile(path, "utf8");
	const rendered = await markdown.render(content);
	const html = `<div class="markdown"><div class="markdown-body" id="README.md">${rendered}</div></div>`;
	return html;
}
