import Link from "next/link";
import { useContext } from "react";
import { FileIcon, FolderIcon } from "@icons";
import { Item } from "api/Response";
import { useDefaultStyles } from "components";
import { LoadingContext } from "context/loading-context";
import { getDateAgo } from "utils/get-date-ago";
import useStyles from "./Dsplay.styles";

interface DisplayProps extends Partial<Item>, Omit<React.HTMLProps<HTMLDivElement>, "size" | "id"> {
  styles?: { name?: React.CSSProperties };
}

const Display = ({ id, created, isDirectory, isFile, name, path, modified, size, styles, ...props }: DisplayProps) => {
  const { cx, classes } = useStyles();
  const { defaultClasses } = useDefaultStyles();
  const context = useContext(LoadingContext);

  const SvgProps: React.SVGProps<SVGSVGElement> = {
    width: "16",
    height: "16",
    fill: "var(--icon-color)",
    className: classes.icon,
  };

  const href = `${isFile ? "/blob" : "/home"}${path}`;

  return (
    <div key={id} className={classes.control} {...props} data-size={size}>
      {created && <time dateTime={`${created}`} style={{ display: "none" }} />}
      <div className={classes.info}>
        {isFile && <FileIcon {...SvgProps} />}
        {isDirectory && <FolderIcon {...SvgProps} />}
        <Link href={href}>
          <a
            onClick={() => context.setIsLoading(true)}
            role="button"
            tabIndex={-1}
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
