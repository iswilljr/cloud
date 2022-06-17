import { useContext } from "react";
import { LoadingContext } from "context/loading-context";
import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
	control: {
		position: "fixed",
		width: "100%",
		height: "auto",
	},
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
