import ReactMarkdown from "react-markdown";
import { Highlight, CopyBtn, useMarkdownStyles as useStyles } from "components";

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
				h1: (props) => <Heading component="h1" {...props} />,
				h2: (props) => <Heading component="h2" {...props} />,
				h3: (props) => <Heading component="h3" {...props} />,
				h4: (props) => <Heading component="h4" {...props} />,
				h5: (props) => <Heading component="h5" {...props} />,
				h6: (props) => <Heading component="h6" {...props} />,
			}}
		>
			{markdown}
		</ReactMarkdown>
	);
};

export default Markdown;

function Heading({
	component: H,
	children,
	...props
}: React.HTMLProps<HTMLHeadingElement> & { component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }) {
	return (
		<H {...props} id={String(children).toLowerCase().replace(/\s/g, "-")}>
			{children}
		</H>
	);
}
