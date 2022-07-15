import Image from "next/image";
import Link from "next/link";
import { usePath } from "utils/get-path";
import Cloud from "./Cloud";

const Header = ({ color }: { color?: string }) => {
  const { ui, basePath } = usePath();
  const changeUiHref = basePath.replace(ui === "deno" ? "/deno" : "/github", ui === "deno" ? "/github" : "/deno");

  return (
    <div className="header border-color border-b backdrop-blur-3xl">
      <div className="section-x-inset-xl py-3">
        <nav className="flex justify-between">
          <div className="flex h-9 w-auto select-none items-center">
            <Link href={ui ? `/${ui}/home` : "/"}>
              <a className="flex h-8 items-center">
                <Image width={32} height={32} src={`${ui ? `/${ui}/` : "/"}logo.svg`} alt={`${ui || "cloud"} logo`} />
                <span className="ml-4 text-xl font-semibold">
                  Cloud{ui && ` - ${ui === "deno" ? "Deno" : "GIthub"}`}
                </span>
              </a>
            </Link>
          </div>
          {ui ? (
            <div className="flex items-center font-medium">
              <a href={changeUiHref} className="border-color button flex h-9 items-center rounded-md border px-4">
                Jump to {ui === "deno" ? "Github UI" : "Deno UI"}
              </a>
            </div>
          ) : (
            <Cloud hideText color={color} />
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
