import { createStyles } from "@mantine/core";

export const useCopyStyles = createStyles(() => ({
	control: {
		position: "absolute",
		top: "0",
		right: "0",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "34px",
		height: "36px",
		margin: "8px !important",
		fontSze: "14px",
		fontWeight: 500,
		lineHeight: "20px",
		whiteSpace: "nowrap",
		cursor: "pointer",
		userSelect: "none",
		border: "1px solid",
		borderRadius: "6px",
		color: "#c9d1d9",
		backgroundColor: "var(--border-color)",
		transition: "80ms cubic-bezier(0.33, 1, 0.68, 1)",
		transitionProperty: "color,background-color,box-shadow,border-color",
		"&:hover": {
			backgroundColor: "var(--border-hover-color)",
			borderColor: "var(--icon-color)",
			transitionDuration: ".1s",
		},
	},
	noCopiedBorder: {
		borderColor: "rgba(240, 246, 253, .1)",
	},
	copiedBorder: {
		borderColor: "var(--succes-color) !important",
	},
}));