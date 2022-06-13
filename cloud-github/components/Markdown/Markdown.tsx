import ReactMarkdown from "react-markdown";
import Highlight from "components/Highlight/Highlight";
import { createStyles } from "@mantine/core";
import CopyIcon from "components/icons/CopyIcon";
import CopyButton from "components/CopyButton/CopyButton";

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
					return (
						<div className={classes.code}>
							{!inline && match ? (
								<Highlight
									code={String(children).replace(/\n$/, "")}
									language={match[1]}
									preTag="pre"
									styles={{ root: { backgroundColor: "#161b22", fontSize: "13.6px" } }}
									//	{...props}
								/>
							) : (
								<code className={className} {...props}>
									{children}
								</code>
							)}
							<CopyButton value={String(children)} />
						</div>
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
