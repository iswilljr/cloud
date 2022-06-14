import { createStyles } from "@mantine/core";

export const useLoadingStyles = createStyles(() => ({
	control: {
		position: "fixed",
		width: "100%",
		height: "auto",
	},
	// absolute top-0 linear-progress w-full
	progress: {
		position: "absolute",
		top: "0",
		width: "100%",
	},
}));