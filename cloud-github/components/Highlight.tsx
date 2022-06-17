interface HighlightProps {
	code: string;
	lines: number;
}

const Highlight = ({ code, lines }: HighlightProps) => {
	return (
		<div style={{ display: "flex", overflowY: "hidden" }}>
			<div className="lines" style={{ userSelect: "none" }}>
				{[...Array(lines)].map((_, i) => (
					<div key={i} className="line" style={{ width: 50, height: 19.72, fontSize: 12, textAlign: "right", color: "#6e7181" }}>
						{i + 1}
					</div>
				))}
			</div>
			<div className="markdown-body bg" dangerouslySetInnerHTML={{ __html: code }}></div>
		</div>
	);
};

export default Highlight;
