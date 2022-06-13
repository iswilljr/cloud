import { AppShell, AppShellProps } from "@mantine/core";
import { Header } from "components/Header/Header";
import { CommitIcon, EditIcon, SettingsIcon } from "components/icons";
import { useStyles } from "./styles";
import RepoHeader from "../RepoHeader/Header";
import { buttons } from "utils/repo-aside-buttons";
import Button from "components/Button/Button";
import { buttons as fileButtons } from "utils/repo-files-buttons";
import Image from "next/image";
import Markdown from "components/Markdown/Markdown";
import Link from "next/link";
import { useDefaultStyles } from "components/defaultStyles";
import { DefaultProps } from "api/Response";

export function Layout({ children, className, pathname, response, ...props }: AppShellProps & DefaultProps) {
	const { classes, cx } = useStyles();
	const { defaultClasses } = useDefaultStyles();

	return (
		<AppShell
			className={classes.control}
			style={{ backgroundColor: "#0d1117" }}
			styles={{
				body: { backgroundColor: "#0d1117" },
				main: { backgroundColor: "#0d1117" },
				root: { backgroundColor: "#0d1117" },
			}}
			padding={0}
			header={<Header />}
			{...props}
		>
			<main className={classes.app}>
				<RepoHeader pathname={pathname} /* response={respones} */ />
				<div className={classes.repo}>
					<div className={cx(classes.grid, response.success && response.data.info.isFile ? classes.gridFull : "")}>
						<div className={cx(classes.main, response.success && response.data.info.isFile ? classes.full : "")}>
							<div className={classes.fileNav}>
								{fileButtons.map((button, i) =>
									button === "divider" ? <div key={i} style={{ flex: 1 }} /> : <Button key={button.label} {...button} />
								)}
							</div>
							<div className={classes.box}>
								<div className={classes.boxHeader}>
									<div className={classes.headerDetails}>
										<Image
											src="https://avatars.githubusercontent.com/u/97823389?v=4"
											className={classes.avatar}
											alt="user"
											width="24"
											height="24"
										/>
										<div className={classes.moreDetails}>iswilljr</div>
										<div className={classes.commits}>
											<CommitIcon width="16" height="16" fill="#c1d1d9" />
											<strong>{response.success ? response.data.info.name : "No name"}</strong>
										</div>
									</div>
								</div>
								{response.success && response.data.info.isFile && (
									<div className={classes.fileInfo}>Last Modified {response.data.info.modified}</div>
								)}
								{response.success && response.data.info.isDirectory && children}
							</div>
							{response.success && response.data.info.isFile && children}
							{response.success && response.data.info.isDirectory && response.data.info.readme?.has && (
								<div className={classes.markdown}>
									<div className={classes.markdownHeader}>
										<div className={classes.markdownTitle}>
											<Link
												href={`/home${pathname}${pathname.endsWith("/") ? "" : "/"}${response.data.info.readme.name}`}
											>
												<a className={defaultClasses.anchor}>README.md</a>
											</Link>
										</div>
										<div className={classes.markdownEdit}>
											<EditIcon width="16" height="16" fill="#8b949e" />
										</div>
									</div>
									<div className={classes.markdownContent}>
										<Markdown markdown={response.data.info.readme.content.data} />
									</div>
								</div>
							)}
						</div>
						<aside className={cx(classes.aside, response.success && response.data.info.isFile ? classes.hide : "")}>
							<div className={classes.navbar}>
								<div className={classes.navbarRow}>
									<h2 className={classes.h2}>About</h2>
									<SettingsIcon height="16" width="16" fill="#8b949e" />
								</div>
								<div className={classes.desc}>No description, website, or topics provided.</div>
								{buttons.map((button) => (
									<a key={button.href} href={button.href} className={cx(classes.anchor, classes.button)}>
										<button.icon height="16" width="16" fill="#8b949e" />
										{button.label}
									</a>
								))}
							</div>
						</aside>
					</div>
				</div>
			</main>
		</AppShell>
	);
}
