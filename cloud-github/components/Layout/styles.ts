import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	control: {
		backgroundColor: "#0d1117",
		userSelect: "none",
		minHeight: "100vh",
	},
	app: {
		padding: 0,
		width: "100%",
		height: "100%",
	},
	repo: {
		width: "100%",
		maxWidth: "1280px",
		margin: "24px auto 0",
		padding: "0 32px",
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "minmax(0, calc(100% - 296px - 26px)) 0 auto",
		gridAutoFlow: "column",
		gridGap: "24px",
		[theme.fn.smallerThan("md")]: {
			gridAutoFlow: "row",
			gridTemplateColumns: "1fr !important",
		},
	},
	gridFull: {
		gridAutoFlow: "row",
		gridTemplateColumns: "1fr !important",
	},
	main: {
		gridColumn: 1,
		[theme.fn.smallerThan("md")]: {
			gridRow: 1,
			width: "100% !important",
			gridColumn: "1 !important",
		},
		marginBottom: "32px",
		// display: "flex",
		// flexDirection: "column",
	},
	full: {
		gridRow: 1,
		width: "100% !important",
		gridColumn: "1 !important",
	},
	aside: {
		gridClumn: "2/span 2",
		[theme.fn.smallerThan("md")]: {
			display: "none",
		},
		width: "296px",
	},
	navbar: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		width: "100%",
	},
	navbarRow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		height: "24px",
		marginBottom: "16px",
	},
	h2: {
		fontWeight: "bold",
		fontSize: "16px",
	},
	desc: {
		fontStyle: "italic",
		fontSize: "16px",
		marginBottom: "16px",
		color: "#8b949e",
	},
	anchor: {
		textDecoration: "none",
		color: "#8b949e",
	},
	button: {
		marginTop: "8px",
		"&:hover": {
			color: "#58a6ff",
		},
		"& svg": {
			marginRight: "8px",
		},
		"&:hover svg": {
			fill: "#58a6ff",
		},
		display: "flex",
		alignItems: "center",
		fontSize: "14px",
	},
	fileNav: {
		display: "flex",
		alignItems: "start",
		marginBottom: "16px",
	},
	box: {
		marginBottom: "16px",
		backgroundColor: "#0d1117",
		border: "1px solid #30363d",
		borderRadius: "6px",
	},
	boxHeader: {
		position: "relative",
		margin: "-1px -1px 0",
		backgroundColor: "#161b22",
		border: "1px solid #30363d",
		borderTopLeftRadius: "6px",
		borderTopRightRadius: "6px",
		padding: "16px",
	},
	headerDetails: {
		display: "flex",
		alignItems: "center",
	},
	avatar: {
		backgroundColor: "transparent !important",
		borderRadius: "9999px",
	},
	moreDetails: {
		display: "flex",
		alignItems: "center",
		marginLeft: "16px",
		fontWeight: "bold",
		flex: 1,
	},
	commits: {
		color: "#c1d1d9",
		fontSize: "14px",
		display: "flex",
		alignItems: "center",
		"& > svg": {
			marginRight: "4px",
		},
	},
	fileInfo: {
		borderBottomLeftRadius: "6px",
		borderBottomRightRadius: "6px",
		padding: "16px",
		fontSize: "14px",
		color: "#c9d1d9",
	},
	hide: {
		display: "none",
	},
	markdown: {
		border: "1px solid #30363d",
		borderRadius: "6px",
		backgroundColor: "#0d1117",
	},
	markdownHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "16px",
		fontSze: "14px",
		height: "54px",
		borderTopLeftRadius: "6px",
		borderTopRightRadius: "6px",
	},
	markdownTitle: {
		flex: 1,
		fontWeight: "bold",
	},
	markdownEdit: {
		cursor: "pointer",
		"&:hover svg": {
			fill: "#58a6ff",
		},
	},
	markdownContent: {
		padding: "16px 32px 32px",
		borderBottomLeftRadius: "6px",
		borderBottomRightRadius: "6px",
	},
}));
