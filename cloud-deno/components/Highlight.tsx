import SyntaxHighlighter from "react-syntax-highlighter";
import github from "react-syntax-highlighter/dist/esm/styles/hljs/github-gist";

const Highlight = ({ code }: { code: string }) => {
	return (
		<SyntaxHighlighter
		showLineNumbers
		lineNumberStyle={{ color: "#D1D5DB", fontSize: 13.6 }}
		customStyle={{ backgroundColor: "#F6F8FA", fontSize: 13.6 }}
		language="javascript"
		style={github}
	>
		{code}
	</SyntaxHighlighter>)
};

export default Highlight;
