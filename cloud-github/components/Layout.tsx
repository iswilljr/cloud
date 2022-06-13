import { AppShell, AppShellProps, createStyles } from "@mantine/core";
import { ListProps, BlobProps } from "api/Response";
import { Header, RepoHeader, Aside } from "components";

const backgroundColor = "var(--background-color)";

const useStyles = createStyles((theme) => ({
	control: { backgroundColor, userSelect: "none", minHeight: "100vh" },
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
	},
	full: { gridRow: 1, width: "100% !important", gridColumn: "1 !important" },
}));

export default function Layout({
	children,
	className,
	app: { pathname, response, type },
	...props
}: AppShellProps & { app: ListProps | BlobProps }) {
	const { classes, cx } = useStyles();

	return (
		<AppShell
			className={classes.control}
			style={{ backgroundColor }}
			styles={{
				body: { backgroundColor },
				main: { backgroundColor },
				root: { backgroundColor },
			}}
			padding={0}
			header={<Header />}
			{...props}
		>
			<main className={classes.app}>
				<RepoHeader pathname={pathname} /* response={respones} */ />
				<div className={classes.repo}>
					<div className={cx(classes.grid, type === "blob" ? classes.gridFull : "")}>
						<div className={cx(classes.main, type === "blob" ? classes.full : "")}>{children}</div>
						<Aside hide={type === "blob"} />
					</div>
				</div>
			</main>
		</AppShell>
	);
}
