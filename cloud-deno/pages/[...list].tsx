import { ListProps } from "api/Response";
import { FolderIcon } from "@heroicons/react/solid";
import File from "components/File";
import Display from "components/Display";
import { createServerSideProps } from "utils/get-server-side-props";
import Error from "components/Error";

const App = ({ pathname, response }: ListProps) => {
	return response.success ? (
		<>
			<section className="list">
				<div className="list-content">
					<div className="flex items-center">
						<FolderIcon className="icon-2" />
						<span className="ml-2 font-medium truncate">{decodeURI(pathname)}</span>
					</div>
				</div>
				{response.content.type === "directory" && (
					<>
						{pathname !== "/" && <Display isDirectory goBack path={`${pathname}/..`} />}
						{response.content.data.directories.concat(response.content.data.files).map((dir) => (
							<Display key={dir.name} {...dir} />
						))}
					</>
				)}
			</section>
			{response.info.readme.has && (
				<File
					pathname={`/blob${pathname}`}
					href={`/blob${pathname}/${response.info.readme.name}`}
					name={response.info.readme.name}
					dangerouslySetInnerHTML={{ __html: response.info.readme.content }}
				/>
			)}
		</>
	) : (
		<Error />
	);
};

export const getServerSideProps = createServerSideProps({ type: "list" });

export default App;
