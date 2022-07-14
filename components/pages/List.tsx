import Display from "components/Display";
import { createServerSideProps } from "utils/create-server-side-props";
import type { ListProps } from "api/types";
import File from "components/File";
import Error from "../Error";

const Home = ({ pathname, response }: ListProps) => {
  return response.success ? (
    <>
      <div className="flex flex-col overflow-x-auto">
        <div className="border-color inline-block min-w-full overflow-hidden rounded-lg border shadow-sm">
          <div className="folder-info flex justify-between px-4 py-2">
            <div className="flex items-center">
              <svg fill="currentColor" viewBox="0 0 20 20" className="mr-2 inline-block h-6 w-6 text-gray-400">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <span className="ml-2 font-medium">Home{pathname}</span>
            </div>
          </div>
          <div>
            <table className="first w-full min-w-full table-fixed">
              <colgroup>
                <col className="w-9 md:w-12" />
                <col className="w-max-content" />
                <col style={{ width: "11rem" }} />
              </colgroup>
              <tbody>
                {pathname !== "/" && <Display name=".." path={`${pathname}/..`} />}
                {response.content.directories.concat(response.content.files).map((item, index) => (
                  <Display key={index} {...item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {response.readme.has && <File name={response.readme.name} __html={response.readme.content} />}
    </>
  ) : (
    <Error />
  );
};

export const getServerSideProps = createServerSideProps({ type: "list" });

export default Home;
