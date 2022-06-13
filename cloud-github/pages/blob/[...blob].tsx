import { GetServerSideProps } from "next";
import { getBlob } from "api";
import { BlobProps } from "api/Response";
import { getPath } from "utils/get-path";

const Blob = ({ pathname }: BlobProps) => {
	console.log({ pathname });

	return (
		<div>
			{/* {response.info.isFile && response.content.type !== "directory" && (
				<div className={classes.file}>
					<div className={classes.fileHeader}>
						<div className={classes.info}>
							{response.content.data.split("\n").length} lines
							<span className={classes.divider}></span>
							{response.info.size}
							{response.content.type === "file" && response.content.language && (
								<>
									<span className={classes.divider}></span>
									{response.content.language}
								</>
							)}
						</div>
						<div className={classes.icons}>
							<span className={classes.icon} onClick={() => clipboard.copy(response.content.data)}>
								{clipboard.copied ? <CheckIcon fill="var(--succes-color)" id="copied" /> : <CopyIcon fill="var(--icon-color)" />}
							</span>
							<span className={classes.icon}>
								<EditIcon fill="var(--icon-color)" />
							</span>
						</div>
					</div>
					<div className={classes.fileContent}>
						{response.content.type === "file" && (
							<Highlight
								language={response.content.language ?? undefined}
								code={response.content.data.replace(/\t/g, "  ")}
								wrap
								lineNumbers
							/>
						)}
						{response.content.type === "markdown" && (
							<div className={classes.markdownPadding}>
								<Markdown markdown={response.content.data} />
							</div>
						)}
					</div>
				</div>
			)} */}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const pathname = getPath(ctx.query?.blob, false);
	let response;
	try {
		response = await getBlob(pathname);
	} catch (error) {
		response = error;
	}
	return { props: { pathname, response, type: "blob" } };
};

export default Blob;
