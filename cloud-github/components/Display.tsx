import Link from "next/link";
import { useContext } from "react";
import { FileIcon, FolderIcon } from "@icons";
import { Item } from "api/Response";
import { useDefaultStyles, useDisplayStyles as useStyles } from "components";
import { LoadingContext } from "context/loading-context";
import { getDateAgo } from "utils/get-date-ago";

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
