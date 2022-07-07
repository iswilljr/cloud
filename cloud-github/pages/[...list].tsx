import Image from "next/image";
import Link from "next/link";
import { ListProps } from "api/Response";
import { useDefaultStyles, Button, Display, Markdown, Error } from "components";
import { getDateAgo } from "utils/get-date-ago";
import { buttons } from "utils/repo-files-buttons";
import { createServerSideProps } from "utils/get-server-side-props";
import { CommitIcon, EditIcon } from "@icons";
import useStyles from "components/list.styles";

const Home = ({ pathname, response }: ListProps) => {
  const { classes } = useStyles();
  const { defaultClasses } = useDefaultStyles();

  return response.success ? (
    <>
      <div className={classes.fileNav}>
        {buttons.map((button) =>
          button === "divider" ? <div key="divider" style={{ flex: 1 }} /> : <Button key={button.label} {...button} />
        )}
      </div>
      <div className={classes.box}>
        <div className={classes.boxHeader}>
          <div className={classes.headerDetails}>
            <Image
              src="https://avatars.githubusercontent.com/u/97823389?v=4"
              className={classes.avatar}
              alt="user"
              width="24"
              height="24"
            />
            <div className={classes.moreDetails}>iswilljr</div>
            <div className={classes.commits}>
              <strong className={defaultClasses.hidden} style={{ marginRight: "15px", color: "var(--icon-color)" }}>
                {`Last modified ${getDateAgo(response.info.modified)}`}
              </strong>
              <CommitIcon width="16" height="16" fill="var(--text-color)" />
              <strong>{response.info.name}</strong>
            </div>
          </div>
        </div>
        {response.content.type === "directory" && (
          <>
            {pathname !== "/" && (
              <Display
                name=".."
                path={`${pathname}/..`}
                styles={{
                  name: { color: "var(--link-color)", textDecoration: "none", fontSize: "18px" },
                }}
              />
            )}
            {[...response.content.data.directories, ...response.content.data.files].map((item) => (
              <Display key={item.id} {...item} />
            ))}
          </>
        )}
      </div>
      {response.info.readme.has && (
        <div className={classes.markdown} id="readme">
          <div className={classes.markdownHeader}>
            <div className={classes.markdownTitle}>
              <Link href={`/blob${pathname}${pathname.endsWith("/") ? "" : "/"}${response.info.readme.name}`}>
                <a className={defaultClasses.anchor}>README.md</a>
              </Link>
            </div>
            <div className={classes.markdownEdit}>
              <EditIcon width="16" height="16" fill="var(--icon-color)" />
            </div>
          </div>
          <div className={classes.markdownContent}>
            <Markdown markdown={response.info.readme.content} />
            <div
              className="markdown-body"
              style={{ maxWidth: "1012px", marginRight: "auto", marginLeft: "auto" }}
              dangerouslySetInnerHTML={{ __html: response.info.readme.content }}
            />
          </div>
        </div>
      )}
    </>
  ) : (
    <Error />
  );
};

export const getServerSideProps = createServerSideProps({ type: "list" });

export default Home;
