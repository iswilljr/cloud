import { FolderIcon, DocumentIcon } from "@heroicons/react/solid";
import { Item } from "api/Response";
import { LoadingContext } from "context/loading-context";
import Link from "next/link";
import { useContext } from "react";

const Display = ({ name, size, isFile, isDirectory, goBack, path }: Partial<Item> & { goBack?: boolean }) => {
	const loading = useContext(LoadingContext);

	return (
		<Link href={`/${isFile ? "blob" : "home"}${path?.startsWith("/") ? "" : "/"}${path}`}>
			<a onClick={() => loading.setIsLoading(true)} className="item">
				<div className="item-content">
					<span className={`item-icon ${isDirectory ? "text-blue-300" : "text-gray-400"} ${goBack ? "ml-[4px]" : ""}`}>
						{goBack ? ".." : isDirectory ? <FolderIcon className="icon" /> : <DocumentIcon className="icon" />}
					</span>
				</div>
				{!goBack && (
					<>
						<div className="item-name">
							<span className="item-displayname">{name}</span>
						</div>
						<div className="item-size">
							<span className="item-displaysize">{size}</span>
						</div>
					</>
				)}
			</a>
		</Link>
	);
};

export default Display;
