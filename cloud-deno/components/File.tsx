import { useEffect, lazy, Suspense } from "react";
import Loading from "./Loader";

const Highlight = lazy(() => import("./Highlight"));

type FileProps = {
	name: string;
	type: "text" | "html" | "media";
	content: string;
	isFile?: boolean;
	isReadme?: boolean;
};

const File = ({ name, type, content, isFile, isReadme }: FileProps) => {
	useEffect(() => {
		if (!isReadme) return;
		const readmeElement = document.getElementById("content-file");
		if (!readmeElement) return;
		const fragment = document.createDocumentFragment();
		const readmeContent = document.createElement("div");
		readmeContent.innerHTML = content;
		readmeContent.className = "py-8  px-4";
		fragment.appendChild(readmeContent);
		readmeElement.appendChild(fragment);
	}, [content, isReadme]);

	return (
		<div className="shadow-sm rounded-lg border border-gray-200 overflow-hidden bg-white">
			<div className="bg-gray-100 border-b border-gray-200 py-2 px-4 flex justify-between">
				<div className="flex items-center">
					<svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6 text-gray-400 inline-block mr-2">
						<path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
					</svg>
					<span className="font-medium">
						<a href="/x/lodash@4.17.19/README.md" className="link">
							{name}
						</a>
					</span>
				</div>
			</div>
			<div className="" id="content-file">
				{isFile && type === "text" && <Suspense fallback={<Loading />}><Highlight code={content} /></Suspense>}
				{isFile && type === "media" && (
					<div className="media-file w-full min-h-24 text-[13.6px] flex flex-col items-center justify-center p-6 text-center">
						Appears to be a media file or file size is too large to display.
						<span>
							If you want to see it, you can download it by clicking{" "}
							<a className="link" href={content} target="_parent" rel="noreferrer">
								here
							</a>
							.
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default File;
