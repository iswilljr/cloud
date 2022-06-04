/* eslint-disable jsx-a11y/anchor-is-valid */
import { Suspense, lazy } from "react";
import { FolderIcon } from "@heroicons/react/solid";
import { selectFileInfo, selectInfo, selectPathname, selectSuccess, selectIsLoading } from "app/appSlice";
import { useAppSelector } from "app/hooks";
import Loading from "./Loader";

const Dir = lazy(() => import("./Dir"));
const Error = lazy(() => import("./Error"));
const File = lazy(() => import("./File"));

const Content = () => {
	const loading = useAppSelector(selectIsLoading);
	const success = useAppSelector(selectSuccess);
	const pathname = useAppSelector(selectPathname);
	const { readme, isDirectory, isFile } = useAppSelector(selectInfo);
	const fileInfo = useAppSelector(selectFileInfo);

	return (
		<div className="col-span-1 md:col-span-2 lg:col-span-3">
			<div className="flex flex-col gap-4">
				{isDirectory && success && (
					<Suspense fallback={<Loading className="min-h-[308px] rounded-md border border-gray-200 bg-white" />}>
						<section className="folder-desc rounded-md border border-gray-200 bg-white">
							<div className="rounded-tr-md rounded-tl-md bg-gray-100 border-b border-gray-200 py-2 px-4 flex justify-between">
								<div className="flex items-center">
									<FolderIcon className="w-6 h-6 text-gray-400 inline-block mr-2" />
									<span className="ml-2 font-medium truncate">{decodeURI(pathname)}</span>
								</div>
							</div>
							<Dir />
						</section>
					</Suspense>
				)}
				{isFile && success && (
					<Suspense fallback={<Loading />}>
						<File
							name={
								pathname
									.split("/")
									.filter((_) => _)
									.pop() ?? "FILE"
							}
							content={fileInfo.data}
							type={fileInfo.type}
							isFile={!pathname.toLowerCase().endsWith(".md")}
							isReadme={pathname.toLowerCase().endsWith(".md")}
						/>
					</Suspense>
				)}
				{success && isDirectory && readme?.has && (
					<Suspense fallback={<Loading />}>
						<File name={readme.name} content={readme.content.data} type={readme.content.type} isReadme />
					</Suspense>
				)}
				{!loading && !success && (
					<Suspense fallback={<Loading />}>
						<div className="min-w-full w-full">
							<Error />
						</div>
					</Suspense>
				)}
			</div>
		</div>
	);
};

export default Content;
