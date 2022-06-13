import { createStyles } from "@mantine/core";
import Link from "next/link";
import { useContext } from "react";
import { FileIcon, FolderIcon } from "@icons";
import { Item } from "api/Response";
import { useDefaultStyles } from "components";
import { LoadingContext } from "context/loading-context";
import { getDateAgo } from "utils/get-date-ago";

const useStyles = createStyles((theme) => ({
	control: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "8px 16px",
		height: "38px",
		maxHeight: "38px",
		border: "1px solid var(--border-color)",
		fontSize: "14px",
		color: "#c9d1d9",
		"&:hover": {
			backgroundColor: "var(--background-hover-color)",
		},
		"&:last-child": {
			borderBottomLeftRadius: "6px",
			borderBottomRightRadius: "6px",
		},
	},
	info: { display: "flex", alignItems: "center", fontSize: "14px", color: "#c9d1d9" },
	icon: { marginRight: "16px" },
	modified: { color: "var(--icon-color) !important" },
}));

interface Styles {
	name?: React.CSSProperties;
}

type HTMLProps = Omit<React.HTMLProps<HTMLDivElement>, "size" | "id">;

const Display = ({
	id,
	created,
	isDirectory,
	isFile,
	name,
	path,
	modified,
	size,
	styles,
	...props
}: Partial<Item> & { styles?: Styles } & HTMLProps) => {
	const { classes } = useStyles();
	const { defaultClasses } = useDefaultStyles();
	const context = useContext(LoadingContext);

	const SvgProps: React.SVGProps<SVGSVGElement> = {
		width: "16",
		height: "16",
		fill: "var(--icon-color)",
		className: classes.icon,
	};

	return (
		<div className={classes.control} {...props}>
			<div className={classes.info}>
				{isFile && <FileIcon {...SvgProps} />}
				{isDirectory && <FolderIcon {...SvgProps} />}
				<Link href={`${isFile ? "/blob" : "/home"}${path}`}>
					<a onClick={() => context.setIsLoading(true)} className={defaultClasses.anchor} style={styles?.name}>
						{name}
					</a>
				</Link>
			</div>
			{modified && <div className={classes.modified}>{getDateAgo(modified)}</div>}
		</div>
	);
};

export default Display;
