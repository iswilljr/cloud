import { BlobProps } from "api/Response";
import { Error, Highlight, Markdown } from "components";
import { useClipboard } from "@mantine/hooks";
import { CheckIcon, CopyIcon, EditIcon } from "@icons";
import { createServerSideProps } from "utils/get-server-side-props";
import useStyles from "components/blob.styles";

const Blob = ({ response }: BlobProps) => {
	const { cx, classes } = useStyles();
	const clipboard = useClipboard();

	return response.success ? (
		<>
			{response.content.type !== "directory" && (
				<div className={classes.file}>
					<div className={classes.fileHeader}>
						<div className={classes.info}>
							{response.content.data.split("\n").length} lines
							<span className={classes.divider} />
							{response.info.size}
						</div>
						<div className={classes.icons}>
							<button
								className={cx(classes.icon, classes.copyBtn)}
								onClick={() =>
									clipboard.copy(
										response.content.type !== "media" && response.content.type !== "directory"
											? response.content.code
											: ""
									)
								}
								type="button"
							>
								{clipboard.copied ? (
									<CheckIcon fill="var(--succes-color)" id="copied" />
								) : (
									<CopyIcon fill="var(--icon-color)" />
								)}
							</button>
							<span className={classes.icon}>
								<EditIcon fill="var(--icon-color)" />
							</span>
						</div>
					</div>
					<div className={classes.fileContent}>
						{response.content.type === "file" && (
							<Highlight
								code={response.content.data.replace(/\t/g, "  ")}
								lines={response.content.lines ?? response.content.data.replace(/\n$/g, "").split("\n").length}
							/>
						)}
						{response.content.type === "markdown" && (
							<div className={classes.markdownPadding}>
								<Markdown markdown={response.content.data} />
							</div>
						)}
						{response.content.type === "media" && (
							<div
								className=""
								style={{
									padding: 16,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								This file can&apos;t be display
							</div>
						)}
					</div>
				</div>
			)}
		</>
	) : (
		<Error />
	);
};

export const getServerSideProps = createServerSideProps({ type: "blob" });

export default Blob;
