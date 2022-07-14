import File from "components/File";
import { createServerSideProps } from "utils/create-server-side-props";
import type { BlobProps } from "api/types";
import Error from "../Error";

const Blob = ({ response }: BlobProps) => {
  return response.success ? (
    <>
      {response.content.type !== "media" ? (
        <File desactivateLink __html={response.content.data} name={response.info.name} />
      ) : (
        <Error
          title="File can't be display here"
          message="Seems like the file is to big or it's a media file to display it."
        />
      )}
    </>
  ) : (
    <Error />
  );
};

export const getServerSideProps = createServerSideProps({ type: "blob" });

export default Blob;
