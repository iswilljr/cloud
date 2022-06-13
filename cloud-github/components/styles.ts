import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	control: {},
	file: {
		marginTop: "16px",
		position: "relative",
		backgroundColor: "#0d1117",
		border: "1px solid #30363d",
		borderRadius: "6px",
		boxSizing: "border-box",
		marginBottom: "16px",
	},
	fileHeader: {
		display: "flex",
		alignItems: "center",
		padding: "8px 16px",
		backgroundColor: "#161b22",
		borderBottom: "1px solid #30363d",
		borderTopLeftRadius: "6px",
		borderTopRightRadius: "6px",
		boxSizing: "border-box",
		height: "46px",
	},
	info: {
		fontSize: "14px",
		flex: 1,
	},
	divider: {
		display: "inline-block",
		width: "1px",
		height: "18px",
		marginRight: "4px",
		marginLeft: "4px",
		verticalAlign: "middle",
		borderLeft: "1px solid #30363D",
		margin: "0 16px",
	},
	icons: {
		display: "flex",
		alignItems: "center",
	},
	icon: {
		margin: "0 8px",
		cursor: "pointer",
		"&:hover svg:not(#copied)": {
			fill: "#58a6ff",
		},
	},
	fileContent: {
		borderBottomLeftRadius: "6px",
		borderBottomRightRadius: "6px",
		padding: 0,
		userSelect: "text",
	},
	markdown: {
		padding: "40px",
	},
}));
