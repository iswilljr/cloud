import { DefaultProps } from "api/Response";
import { useStyles } from "components/styles";
import Display from "components/Display/Display";
import { getPath } from "utils/get-path";
import { list } from "api";
import { GetServerSidePropsContext } from "next";
import CopyIcon from "components/icons/CopyIcon";
import { CheckIcon, EditIcon } from "components/icons";
import { useClipboard } from "@mantine/hooks";
import Markdown from "components/Markdown/Markdown";
import Highlight from "components/Highlight/Highlight";
import { useContext, useEffect } from "react";
import { LoadingContext } from "context/loading-context";

const Home = ({ pathname, response }: DefaultProps) => {
	const { classes, cx } = useStyles();
	const clipboard = useClipboard();
	const { isLoading, setIsLoading } = useContext(LoadingContext);

	console.log({ response, pathname });

	useEffect(() => {
		if (isLoading) setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<>
			{response.success && (
				<>
					{response.data.info.isDirectory && response.data.content.type === "directory" && (
						<>
							{pathname !== "/" && (
								<Display
									name=".."
									path={`${pathname}/..`}
									styles={{ name: { color: "#58a6ff", textDecoration: "none", fontSize: "18px" } }}
								/>
							)}
							{[...response.data.content.data.directories, ...response.data.content.data.files].map((item) => (
								<Display key={item.id} {...item} />
							))}
						</>
					)}
					{response.data.info.isFile && response.data.content.type !== "directory" && (
						<div className={classes.file}>
							<div className={classes.fileHeader}>
								<div className={classes.info}>
									{response.data.content.data.split("\n").length} lines
									<span className={classes.divider}></span>
									{response.data.info.size}
									<span className={classes.divider}></span>
									{response.data.content.type === "text" && response.data.content.language}
								</div>
								<div className={classes.icons}>
									<span className={classes.icon} onClick={() => clipboard.copy(response.data.content.data)}>
										{clipboard.copied ? <CheckIcon fill="#238636" id="copied" /> : <CopyIcon fill="#8b949e" />}
									</span>
									<span className={classes.icon}>
										<EditIcon fill="#8b949e" />
									</span>
								</div>
							</div>
							<div className={classes.fileContent}>
								{response.data.content.type === "text" && (
									<Highlight
										language={response.data.content.language ?? undefined}
										code={response.data.content.data.replace(/\t/g, "  ")}
										wrap
										lineNumbers
									/>
								)}
								{response.data.content.type === "markdown" && (
									<div className={classes.markdown}>
										<Markdown markdown={response.data.content.data} />
									</div>
								)}
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const pathname = getPath(context.query?.all);
	let response;
	try {
		response = await list(pathname);
	} catch (error) {
		response = error;
	}
	return { props: { pathname, response } };
}

export default Home;
