import GithubIcon from "icons/Github";
import TwitterIcon from "icons/Twitter";

const Footer = () => (
  <div className="footer border-color w-full border-t py-6 text-sm leading-tight">
    <div className="section-x-inset-xl flex items-center justify-between">
      <span className="text-xs leading-tight text-gray-400">Copyright © {new Date().getFullYear()} iswilljr.</span>
      <div className="flex items-center gap-3 text-[#666666]">
        <a href="https://github.com/iswilljr" target="_blank" rel="noreferrer">
          <GithubIcon className="h-6 w-6" />
        </a>
        <a href="https://twitter.com/iswilljr" target="_blank" rel="noreferrer">
          <TwitterIcon />
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
