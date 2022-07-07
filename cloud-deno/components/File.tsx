import Link from "next/link";
import { LoadingContext } from "context/loading-context";
import { useContext } from "react";

interface FileProps extends React.HTMLProps<HTMLDivElement> {
  name: string;
  href: string;
  pathname: string;
}

const File = ({ name, href, pathname, ...props }: FileProps) => {
  const loading = useContext(LoadingContext);

  return (
    <div className="file">
      <div className="file-header">
        <div className="flex items-center">
          <svg fill="currentColor" viewBox="0 0 20 20" className="icon-2">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
          </svg>
          <span className="font-medium">
            <Link href={href}>
              <a onClick={() => href !== pathname && loading.setIsLoading(true)} className="link">
                {name}
              </a>
            </Link>
          </span>
        </div>
      </div>
      <div className="markdown-body p-4" {...props} />
    </div>
  );
};

export default File;
