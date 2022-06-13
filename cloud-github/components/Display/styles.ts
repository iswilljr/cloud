import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	control: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "8px 16px",
		height: "38px",
		maxHeight: "38px",
		border: "1px solid #21262d",
		fontSize: "14px",
		color: "#c9d1d9",
		"&:hover": {
			backgroundColor: "#161b22",
		},
		"&:last-child": {
			borderBottomLeftRadius: "6px",
			borderBottomRightRadius: "6px",
		},
	},
	info: {
		display: "flex",
		alignItems: "center",
		fontSize: "14px",
		color: "#c9d1d9",
	},
	icon: {
		marginRight: "16px",
	},
	modified: {
		color: "#8b949e !important",
	}
}));
