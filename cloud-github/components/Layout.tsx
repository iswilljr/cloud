import { AppShell, AppShellProps } from "@mantine/core";
import { ListProps, BlobProps } from "api/Response";
import { Header, RepoHeader, Aside, useLayoutStyles as useStyles, AppShellStyle, AppShellStyles } from "components";

export default function Layout({
	children,
	className,
	app: { pathname, response, type },
	...props
}: AppShellProps & { app: ListProps | BlobProps }) {
	const { classes, cx } = useStyles();

	const hide = !response.success || type === "blob"

	return (
		<AppShell
			className={classes.control}
			style={AppShellStyle}
			styles={AppShellStyles}
			padding={0}
			header={<Header />}
			{...props}
		>
			<main className={classes.app}>
				{response.success ? (<>
				<RepoHeader pathname={pathname} /* response={respones} */ />
				<div className={classes.repo}>
					<div className={cx(classes.grid, hide ? classes.gridFull : "")}>
						<div className={cx(classes.main, hide ? classes.full : "")}>{children}</div>
						<Aside hide={hide} />
					</div>
				</div>
				</>): (
					children
				)}
				
			</main>
		</AppShell>
	);
}
