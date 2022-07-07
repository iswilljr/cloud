import { BlobProps } from "api/Response";
import Error from "components/Error";
import File from "components/File";
import { createServerSideProps } from "utils/get-server-side-props";

const Blob = ({ pathname, response }: BlobProps) => {
  return response.success ? (
    <>
      {response.content.type !== "media" ? (
        <File
          pathname={`/blob${pathname}`}
          href={`/blob${pathname}`}
          name={response.info.name}
          dangerouslySetInnerHTML={{ __html: response.content.type !== "directory" ? response.content.data : "" }}
        />
      ) : (
        <Error message="Sorry! this file can't be display here" />
      )}
    </>
  ) : (
    <Error />
  );
};

export const getServerSideProps = createServerSideProps({ type: "blob" });

export default Blob;
