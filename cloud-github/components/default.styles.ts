import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	anchor: {
		textDecoration: "none",
		"&:hover": { textDecoration: "underline", color: "var(--link-color) !important" },
		fontSize: "14px",
		color: "#c9d1d9",
		cursor: "pointer",
	},
	hidden: { [theme.fn.smallerThan("md")]: { display: "none" } },
	iconStyles: { marginRight: "8px", display: "flex", alignItems: "center", flexWrap: "nowrap" },
	avatar: { backgroundColor: "transparent !important", borderRadius: "9999px" },
	hide: { display: "none" },
}));

export function useDefaultStyles() {
	const { classes: defaultClasses, cx, theme } = useStyles();
	return {
		defaultClasses,
		cx,
		theme,
	};
}
