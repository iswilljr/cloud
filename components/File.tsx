// import { LoadingContext } from "context/loading-context";
// import { useContext } from "react";

import Link from "next/link";
import { usePath } from "utils/get-path";

interface FileProps {
  name: string;
  __html: string;
  desactivateLink?: boolean;
}

const File = ({ name, __html, desactivateLink }: FileProps) => {
  const { blobPath } = usePath();

  return (
    <div className="border-color overflow-hidden rounded-lg border shadow-sm">
      <div className="file-header border-color flex items-center border-b py-2 px-4 font-medium">
        {desactivateLink ? (
          <span className="link">{name}</span>
        ) : (
          <Link href={`${blobPath}/${name}`}>
            <a className="link">{name}</a>
          </Link>
        )}
      </div>
      <div className="px-4">
        <div className="markdown-body py-8 px-4" dangerouslySetInnerHTML={{ __html }} />
      </div>
    </div>
  );
};

export default File;
