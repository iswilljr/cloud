import { createStyles } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import { Highlight, CopyBtn } from "components";

const useStyles = createStyles(() => ({
	control: {
		maxWidth: "1012px",
		marginRight: "auto !important",
		marginLeft: "auto !important",
	},
	code: {
		position: "relative",
		"& > #copy-btn": {
			opacity: 0,
		},
		"&:hover > #copy-btn": {
			opacity: 1,
		},
	},
}));

interface MarkdownProps {
	markdown: string;
}

const Markdown = ({ markdown }: MarkdownProps) => {
	const { classes, cx } = useStyles();

	return (
		<ReactMarkdown
			className={cx(classes.control, "markdown-body")}
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");
					return !inline && match ? (
						<div className={classes.code}>
							<Highlight
								code={String(children).replace(/\n$/, "")}
								language={match[1]}
								preTag="pre"
								styles={{ root: { backgroundColor: "var(--background-hover-color)", fontSize: "13.6px" } }}
								//	{...props}
							/>
							<CopyBtn value={String(children)} />
						</div>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				},
				pre: "div",
			}}
		>
			{markdown}
		</ReactMarkdown>
	);
};

export default Markdown;
