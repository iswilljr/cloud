import { AppShell } from "@mantine/core";
import { ListProps, BlobProps } from "api/Response";
import { Header, RepoHeader, Aside, useLayoutStyles as useStyles, AppShellStyle, AppShellStyles } from "components";

interface LayoutProps {
	app: ListProps | BlobProps;
	children: React.ReactNode;
}

export default function Layout({ children, app: { pathname, response, type } }: LayoutProps) {
	const { classes, cx } = useStyles();
	const hide = !response.success || type === "blob";

	return (
		<AppShell
			className={classes.control}
			style={AppShellStyle}
			styles={AppShellStyles}
			padding={0}
			header={<Header />}
		>
			<main className={classes.app}>
				{response.success ? (
					<>
						<RepoHeader pathname={pathname} />
						<div className={classes.repo}>
							<div className={cx(classes.grid, hide ? classes.gridFull : "")}>
								<div className={cx(classes.main, hide ? classes.full : "")}>{children}</div>
								<Aside hide={hide} />
							</div>
						</div>
					</>
				) : (
					children
				)}
			</main>
		</AppShell>
	);
}
