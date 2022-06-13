import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { getList } from "api";
import { CommitIcon, EditIcon } from "@icons";
import { ListProps } from "api/Response";
import { useDefaultStyles, useListStyles, Button, Display, Markdown } from "components";
import { LoadingContext } from "context/loading-context";
import { getPath } from "utils/get-path";
import { getDateAgo } from "utils/get-date-ago";
import { buttons } from "utils/repo-files-buttons";

const Home = ({ pathname, response }: ListProps) => {
	const { classes, cx } = useListStyles();
	const { defaultClasses } = useDefaultStyles();
	const { isLoading, setIsLoading } = useContext(LoadingContext);

	console.log({ pathname, response });

	useEffect(() => {
		if (isLoading) setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<>
			{response.success ? (
				<>
					<div className={classes.fileNav}>
						{buttons.map((button) =>
							button === "divider" ? (
								<div key="divider" style={{ flex: 1 }} />
							) : (
								<Button key={button.label} {...button} />
							)
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
									<strong style={{ marginRight: "15px", color: "var(--icon-color)" }}>
										{`Last modified ${getDateAgo(response.info.modified)}`}
									</strong>
									<CommitIcon width="16" height="16" fill="var(--text-color)" />
									<strong>{response.info.name}</strong>
								</div>
							</div>
						</div>
						{response.content.type === "directory" && (
							<>
								{pathname !== "/" && (
									<Display
										name=".."
										path={`${pathname}/..`}
										styles={{ name: { color: "var(--link-color)", textDecoration: "none", fontSize: "18px" } }}
									/>
								)}
								{[...response.content.data.directories, ...response.content.data.files].map((item) => (
									<Display key={item.id} {...item} />
								))}
							</>
						)}
					</div>
					{response.info.readme.has ? (
						<div className={classes.markdown}>
							<div className={classes.markdownHeader}>
								<div className={classes.markdownTitle}>
									<Link href={`/home${pathname}${pathname.endsWith("/") ? "" : "/"}${response.info.readme.name}`}>
										<a className={defaultClasses.anchor}>README.md</a>
									</Link>
								</div>
								<div className={classes.markdownEdit}>
									<EditIcon width="16" height="16" fill="var(--icon-color)" />
								</div>
							</div>
							<div className={classes.markdownContent}>
								<Markdown markdown={response.info.readme.content} />
							</div>
						</div>
					) : (
						<span>Add README.md</span>
					)}
				</>
			) : (
				<span>Something went wrong</span>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const pathname = getPath(ctx.query?.all);
	let response;
	try {
		response = await getList(pathname);
	} catch (error) {
		response = error;
	}
	return { props: { pathname, response, type: "list" } };
};

export default Home;
