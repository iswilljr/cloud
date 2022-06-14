import { createStyles } from "@mantine/core";

export const useAsideStyles = createStyles((theme) => ({
	control: { gridClumn: "2/span 2", [theme.fn.smallerThan("md")]: { display: "none" }, width: "296px" },
	navbar: { display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" },
	navbarRow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		height: "24px",
		marginBottom: "16px",
	},
	h2: { fontWeight: "bold", fontSize: "16px" },
	desc: { fontStyle: "italic", fontSize: "16px", marginBottom: "16px", color: "var(--icon-color)" },
	anchor: { textDecoration: "none", color: "var(--icon-color)" },
	button: {
		marginTop: "8px",
		"&:hover": { color: "var(--link-color)" },
		"& svg": { marginRight: "8px" },
		"&:hover svg": { fill: "var(--link-color)" },
		display: "flex",
		alignItems: "center",
		fontSize: "14px",
	},
	hide: { display: "none" },
}));