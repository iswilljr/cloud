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
        {pathname !== "/" && <Display isDirectory goBack path={`${pathname}/..`} />}
        {response.content.directories.concat(response.content.files).map((item) => (
          <Display key={item.name} {...item} />
        ))}
      </section>
      {response.readme.has && (
        <File
          pathname={`/blob${pathname}`}
          href={`/blob${pathname}/${response.readme.name}`}
          name={response.readme.name}
          dangerouslySetInnerHTML={{ __html: response.readme.content }}
        />
      )}
    </>
  ) : (
    <Error />
  );
};

export const getServerSideProps = createServerSideProps({ type: "list" });

export default App;
