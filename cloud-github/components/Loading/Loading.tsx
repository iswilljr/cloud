import { LoadingContext } from "context/loading-context";
import { useContext } from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
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

const Loading = () => {
	const { classes, cx } = useStyles();
	const context = useContext(LoadingContext);

	return (
		<>
			{context.isLoading && (
				<div className={classes.control}>
					<progress className={cx(classes.progress, "linear-progress")} />
				</div>
			)}
		</>
	);
};

export default Loading;
