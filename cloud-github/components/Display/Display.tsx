import { Item } from "api/Response";
import { FileIcon, FolderIcon } from "components/icons";
import { LoadingContext } from "context/loading-context";
import Link from "next/link";
import { useContext } from "react";
import { useStyles } from "./styles";
import { useDefaultStyles } from "../defaultStyles";

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
		fill: "#8b949e",
		className: classes.icon,
	};

	return (
		<div className={classes.control} {...props}>
			<div className={classes.info}>
				{isFile && <FileIcon {...SvgProps} />}
				{isDirectory && <FolderIcon {...SvgProps} />}
				<Link href={`/home${path}`}>
					<a onClick={() => context.setIsLoading(true)} className={defaultClasses.anchor} style={styles?.name}>
						{name}
					</a>
				</Link>
			</div>
			<div className={classes.modified}>{modified}</div>
		</div>
	);
};

export default Display;
