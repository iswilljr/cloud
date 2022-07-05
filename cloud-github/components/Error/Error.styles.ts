import { createStyles } from "@mantine/core";

export default createStyles(() => ({
	control: { display: "flex", flex: "auto", flexDirection: "column" },
	main: { position: "relative" },
	errorBg: { position: "absolute", width: "100%", height: "370px", top: 0, left: 0 },
	container: {
		maxWidth: "940px",
		height: "370px",
		clear: "both",
		display: "block",
		margin: "0 auto",
		position: "relative",
	},
	error404: { zIndex: 9, top: 72, left: 72, position: "absolute" },
	buttonWrapper: {
		margin: "32px auto",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
	},
	path: {
		textAlign: "center",
		"&> *": {
			margin: "4px 0",
		},
		marginBottom: 16,
	},
	link: { color: "var(--link-color)" },
}));
