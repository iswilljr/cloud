import { AppShell } from "@mantine/core";
import { BlobProps, ListProps } from "api/Response";
import { Repo, Aside } from "components";
import Header from "../Header/Header";
import useStyles from "./Layout.styles";

interface LayoutProps {
	children: React.ReactNode;
	app: ListProps | BlobProps;
}

export default function Layout({ children, app: { pathname, response, type } }: LayoutProps) {
	const { cx, classes } = useStyles();
	const hide = !response.success || type === "blob";

	return (
		<AppShell className={classes.control} header={<Header />} padding={0}>
			<div className={classes.app}>
				{response.success ? (
					<>
						<Repo pathname={pathname} />
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
			</div>
		</AppShell>
	);
}
