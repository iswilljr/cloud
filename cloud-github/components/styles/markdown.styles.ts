import { createStyles } from "@mantine/core";

export const useMarkdownStyles = createStyles(() => ({
	control: {
		maxWidth: "1012px",
		marginRight: "auto !important",
		marginLeft: "auto !important",
	},
	code: {
		position: "relative",
		"& > #copy-btn": {
			opacity: 0,
		},
		"&:hover > #copy-btn": {
			opacity: 1,
		},
	},
}));