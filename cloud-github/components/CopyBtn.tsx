import { useClipboard } from "@mantine/hooks";
import { CheckIcon, CopyIcon } from "@icons";
import { useCopyStyles as useStyles } from "components";

const CopyBtn = ({ value }: { value: any }) => {
	const { classes, cx } = useStyles();
	const clipboard = useClipboard();

	return (
		<div
			className={cx(classes.control, clipboard.copied ? classes.copiedBorder : classes.noCopiedBorder)}
			onClick={() => clipboard.copy(value)}
			id="copy-btn"
		>
			{clipboard.copied ? (
				<CheckIcon width="16" height="16" fill="var(--succes-color)" />
			) : (
				<CopyIcon width="16" height="16" fill="#c9d9d1" />
			)}
		</div>
	);
};

export default CopyBtn;
