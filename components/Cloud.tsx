import GithubIcon from "icons/Github";

const Cloud = ({ hideText, color }: { hideText?: boolean; color?: string }) => {
  return (
    <a
      className={`link flex items-center justify-center rounded-md ${
        hideText ? "" : "button border-color border py-2 px-5"
      }`}
      href="https://github.com/iswilljr/cloud"
      target="_blank"
      rel="noreferrer"
    >
      <GithubIcon className="inline h-6 w-6" fill={color || "#8b949e"} />
      {!hideText && <span className="ml-2">iswilljr/cloud</span>}
    </a>
  );
};

export default Cloud;
