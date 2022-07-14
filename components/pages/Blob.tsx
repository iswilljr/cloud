import File from "components/File";
import { createServerSideProps } from "utils/create-server-side-props";
import type { BlobProps } from "api/types";
import Error from "../Error";
import { useContext, useEffect } from "react";
import { AlertContext } from "context/alert";

const Blob = ({ response }: BlobProps) => {
  const alert = useContext(AlertContext);

  const type = !response.success && response.message.match(/^(warn|error)\s-\s.*/)?.[1];
  const title = !!type && "Something went wrong";
  const message = !!type && response.message.replace(/^(warn|error)\s-\s/, "");

  useEffect(() => {
    if (message) {
      console.log(type);
      alert.setType(type as "warn" | "error");
      alert.setMessage(
        type === "error"
          ? "Seems like the github token is invalid, please make sure you have a right one (file content won't be displayed)."
          : "Github token is missing (file content won't be displayed)."
      );
      alert.setShowAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, type]);

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
    <Error title={title || undefined} message={message || undefined} />
  );
};

export const getServerSideProps = createServerSideProps({ type: "blob" });

export default Blob;
