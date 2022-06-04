/* eslint-disable jsx-a11y/anchor-is-valid */
import { FolderIcon, DocumentIcon } from "@heroicons/react/solid";
import { selectPathname, setLoading } from "app/appSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Link from "next/link";

type DisplayProps = {
	name?: string;
	size?: string;
	isFile?: boolean;
	isDirectory?: boolean;
	created?: number;
	modified?: number;
	goBack?: boolean;
};

const Display = ({ name, size, isFile, isDirectory, created, modified, goBack }: DisplayProps) => {
	const pathname = useAppSelector(selectPathname);
	const dispatch = useAppDispatch();

	return (
		<Link href={`/home${pathname}${pathname === "/" ? "" : "/"}${name}`}>
			<a
				onClick={(e) => {
					// if (!isDirectory) return e.preventDefault();
					dispatch(setLoading(true));
				}}
				className="flex items-center justify-between hover:bg-gray-100 border-t border-gray-200 cursor-pointer"
			>
				<div className="text-sm leading-5 text-gray-400">
					<span
						className={`px-2 sm:pl-3 md:pl-4 py-1 w-full block ${isDirectory ? "text-blue-300" : "text-gray-400"} ${
							goBack ? "ml-[4px]" : ""
						}`}
					>
						{goBack ? ".." : isDirectory ? <FolderIcon className="w-5 h-5" /> : <DocumentIcon className="w-5 h-5" />}
					</span>
				</div>
				{!goBack && (
					<>
						<div className="flex-grow text-sm text-blue-500 leading-5 truncate">
							<span className="pl-2 py-1 w-full block truncate">{name}</span>
						</div>
						<div className="text-sm leading-5 text-gray-500 text-right min-w-fit">
							<span className="px-4 py-1 pl-1 w-full h-full block">{name === "node_modules" ? "" : size}</span>
						</div>
					</>
				)}
			</a>
		</Link>
	);
};

export default Display;
