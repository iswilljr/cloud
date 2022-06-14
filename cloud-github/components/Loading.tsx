import { useContext } from "react";
import { useLoadingStyles as useStyles } from "components";
import { LoadingContext } from "context/loading-context";

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
