import { BlobProps } from "api/Response";
import { Error, Highlight, Markdown, useBlobStyles as useStyles } from "components";
import { useClipboard } from "@mantine/hooks";
import { CheckIcon, CopyIcon, EditIcon } from "@icons";
import { createServerSideProps } from "utils/get-server-side-props";

const Blob = ({ pathname, response }: BlobProps) => {
	const { classes, cx } = useStyles();
	const clipboard = useClipboard();

	console.log({ response });

	return response.success ? (
		<>
			{response.content.type !== "directory" && (
				<div className={classes.file}>
					<div className={classes.fileHeader}>
						<div className={classes.info}>
							{response.content.data.split("\n").length} lines
							<span className={classes.divider}></span>
							{response.info.size}
						</div>
						<div className={classes.icons}>
							<span className={classes.icon} onClick={() => clipboard.copy(response.content.data)}>
								{clipboard.copied ? (
									<CheckIcon fill="var(--succes-color)" id="copied" />
								) : (
									<CopyIcon fill="var(--icon-color)" />
								)}
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
								styles={{
									root: {
										borderBottomLeftRadius: "6px",
										borderBottomRightRadius: "6px",
									},
								}}
								code={response.content.data.replace(/\t/g, "  ")}
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
			)}
		</>
	) : <Error />
};

export const getServerSideProps = createServerSideProps({ type: "blob" });

export default Blob;
