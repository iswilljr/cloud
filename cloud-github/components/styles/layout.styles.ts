import { createStyles, CSSObject } from "@mantine/core";
import React from "react";

const backgroundColor = "var(--background-color)";

export const useLayoutStyles = createStyles((theme) => ({
	control: { backgroundColor: "var(--background-color)", userSelect: "none", minHeight: "100vh" },
	app: { padding: 0, width: "100%", height: "100%" },
	repo: { width: "100%", maxWidth: "1280px", margin: "24px auto 0", padding: "0 32px" },
	grid: {
		display: "grid",
		gridTemplateColumns: "minmax(0, calc(100% - 296px - 26px)) 0 auto",
		gridAutoFlow: "column",
		gridGap: "24px",
		[theme.fn.smallerThan("md")]: { gridAutoFlow: "row", gridTemplateColumns: "1fr !important" },
	},
	gridFull: { gridAutoFlow: "row", gridTemplateColumns: "1fr !important" },
	main: {
		gridColumn: 1,
		[theme.fn.smallerThan("md")]: { gridRow: 1, width: "100% !important", gridColumn: "1 !important" },
		marginBottom: "32px",
		overflowX:"auto"
	},
	full: { gridRow: 1, width: "100% !important", gridColumn: "1 !important" },
}));

export const AppShellStyle: React.CSSProperties = { backgroundColor };

export const AppShellStyles: Record<"body" | "main" | "root", CSSObject> = {
	body: { backgroundColor, overflowX: "hidden" },
	main: { backgroundColor },
	root: { backgroundColor },
};
