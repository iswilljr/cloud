import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
	control: { display: "flex", overflowY: "hidden" },
	lines: { userSelect: "none" },
	line: { width: 50, height: 19.72, fontSize: 12, textAlign: "right", color: "#6e7181" },
}));

interface HighlightProps {
	code: string;
	lines: number;
}

const Highlight = ({ code, lines }: HighlightProps) => {
	const { classes } = useStyles();

	return (
		<div className={classes.control}>
			<div className={classes.lines}>
				{[...Array(lines)].map((_, i) => (
					<div key={i} className={classes.line} id={`${i + 1}`}>
						{i + 1}
					</div>
				))}
			</div>
			<div className="markdown-body bg" dangerouslySetInnerHTML={{ __html: code }} />
		</div>
	);
};

export default Highlight;
