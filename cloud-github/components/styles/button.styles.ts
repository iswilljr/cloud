import { createStyles } from "@mantine/core";

export const useButtonStyles = createStyles((theme) => ({
	control: {
		color: "var(--text-color)",
		padding: "3px 12px",
		fontSize: "12px",
		lineHeight: "20px",
		display: "flex",
		alignItems: "center",
		borderRadius: "6px",
		height: "28px",
		cursor: "pointer",
		marginRight: "8px",
		// truncate
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	style: {
		backgroundColor: "var(--border-color)",
		border: "1px solid rgba(240, 246, 252, .1)",
		"&:hover": {
			backgroundColor: "var(--border-hover-color)",
			borderColor: "var(--icon-color)",
			transitionDuration: "0.1s",
		},
	},
	icon: { marginRight: "4px" },
}));