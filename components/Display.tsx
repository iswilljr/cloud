import { Item } from "api/types";
import { LoadingContext } from "context/loading-context";
import FileIcon from "icons/File";
import FolderIcon from "icons/Folder";
import NextLink from "next/link";
import { useContext } from "react";
import { usePath } from "utils/get-path";
import { getTimeAgo } from "utils/get-time-ago";

const Display = ({ name, modified, isFile, isDirectory }: Partial<Item>) => {
  const { blobPath, listPath } = usePath();
  const href = `${isFile ? blobPath : listPath}/${name}`;

  return (
    <tr key={name} className="border-color table-row border-t">
      <td className="truncate text-sm leading-5 text-gray-400">
        <span className="block w-full px-2 py-1 text-gray-300 sm:pl-3 md:pl-4">
          {isFile ? <FileIcon /> : isDirectory && <FolderIcon />}
        </span>
      </td>
      <td className="truncate text-sm leading-5 text-blue-500">
        <span className="block truncate py-1 pl-2">
          <Link href={href} className="link hover:underline">
            {name}
          </Link>
        </span>
      </td>
      <td className="truncate text-right text-sm leading-5 text-gray-500">
        <span className="block h-full w-full truncate px-4 py-1 pl-1">{modified && getTimeAgo(modified)}</span>
      </td>
    </tr>
  );
};

function Link({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const loading = useContext(LoadingContext);

  return (
    <NextLink href={href}>
      <a className={className} onClick={() => loading.setIsLoading(true)} tabIndex={-1}>
        {children}
      </a>
    </NextLink>
  );
}

export default Display;
