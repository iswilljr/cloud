interface MarkdownProps {
	markdown: string;
}

const Markdown = ({ markdown }: MarkdownProps) => {
	return (
		<div
			className="markdown-body"
			style={{
				maxWidth: "1012px",
				marginRight: "auto",
				marginLeft: "auto",
			}}
			dangerouslySetInnerHTML={{ __html: markdown }}
		></div>
	);
};

export default Markdown;
