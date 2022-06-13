import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	control: {
		color: "#c1d1d9",
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
		backgroundColor: "#21262d",
		border: "1px solid rgba(240, 246, 252, .1)",
		"&:hover": {
			backgroundColor: "#30363d",
			borderColor: "#8B949E",
			transitionDuration: "0.1s",
		},
	},
	icon: {
		marginRight: "4px",
	},
}));
