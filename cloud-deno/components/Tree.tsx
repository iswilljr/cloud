import { LoadingContext } from "context/loading-context";
import Link from "next/link";
import { useContext } from "react";

const Tree = ({ pathname }: { pathname: string }) => {
  const loading = useContext(LoadingContext);

  return (
    <p className="tree">
      <>
        {pathname.split(/\//g).map((p, i, a) => {
          const l = `${a.slice(0, i + 1).join("/")}`;
          const link = l.length ? l : "/";
          return (
            <span key={i}>
              <Link key={i} href={`/home${link}`}>
                <a
                  className="link"
                  onClick={(e) => {
                    if (link !== pathname) return loading.setIsLoading(true);
                    e.preventDefault();
                  }}
                >
                  {i === 0 ? "Home" : p}
                </a>
              </Link>
              {a.length > 1 && i < a.length - 1 && a[1] && <span className="text-gray-500">{" / "}</span>}
            </span>
          );
        })}
      </>
    </p>
  );
};

export default Tree;
