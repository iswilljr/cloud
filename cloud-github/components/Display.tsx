import Link from "next/link";
import { useContext } from "react";
import { FileIcon, FolderIcon } from "@icons";
import { Item } from "api/Response";
import { useDefaultStyles } from "components";
import { LoadingContext } from "context/loading-context";
import { getDateAgo } from "utils/get-date-ago";
import { useRouter } from "next/router";
import { createStyles, CSSObject } from "@mantine/core";

const truncate: CSSObject = { whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" };

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
		"&:hover": { backgroundColor: "var(--background-hover-color)" },
		"&:last-child": { borderBottomLeftRadius: "6px", borderBottomRightRadius: "6px" },
		...truncate,
	},
	info: { display: "flex", alignItems: "center", fontSize: "14px", color: "#c9d1d9", ...truncate },
	icon: { marginRight: "16px" },
	modified: { color: "var(--icon-color) !important" },
	name: truncate,
}));

interface DisplayProps extends Partial<Item>, Omit<React.HTMLProps<HTMLDivElement>, "size" | "id"> {
	styles?: { name?: React.CSSProperties };
}

const Display = ({ id, created, isDirectory, isFile, name, path, modified, size, styles, ...props }: DisplayProps) => {
	const { cx, classes } = useStyles();
	const { defaultClasses } = useDefaultStyles();
	const router = useRouter();
	const context = useContext(LoadingContext);

	const SvgProps: React.SVGProps<SVGSVGElement> = {
		width: "16",
		height: "16",
		fill: "var(--icon-color)",
		className: classes.icon,
	};

	const href = `${isFile ? "/blob" : "/home"}${path}`;

	return (
		<div
			className={classes.control}
			{...props}
			onClick={() => {
				router.push(href);
				context.setIsLoading(true);
			}}
		>
			<div className={classes.info}>
				{isFile && <FileIcon {...SvgProps} />}
				{isDirectory && <FolderIcon {...SvgProps} />}
				<Link href={href}>
					<a
						onClick={() => context.setIsLoading(true)}
						className={cx(defaultClasses.anchor, classes.name)}
						style={styles?.name}
					>
						{name}
					</a>
				</Link>
			</div>
			{modified && <div className={classes.modified}>{getDateAgo(modified)}</div>}
		</div>
	);
};

export default Display;
