import Link from "next/link";
import { Children, Fragment } from "react";
import { usePath } from "utils/get-path";
import Cloud from "./Cloud";

const Info = () => {
  const { pathname, ui } = usePath();

  return (
    <div className="info border-color border-b">
      <div className="section-x-inset-xl flex items-center py-8">
        <div className="flex w-full flex-wrap items-center justify-between">
          <div>
            <Breadcrumb>
              {pathname !== "/" ? (
                pathname.split(/\/+/g).map((item, index, array) => {
                  const isLast = index === array.length - 1;
                  if (isLast)
                    return (
                      <strong className="cursor-pointer" key={index}>
                        <span className="link">{item}</span>
                      </strong>
                    );

                  const href = `/${ui}/home${array.slice(0, index + 1).join("/")}`;
                  const link = (
                    <Link href={href} key={index}>
                      <a className="link">{item || "Home"}</a>
                    </Link>
                  );

                  return link;
                })
              ) : (
                <strong className="cursor-pointer">
                  <span className="link">Home</span>
                </strong>
              )}
            </Breadcrumb>
            <div className="text-sm">The fullstack cloud project</div>
          </div>
          <Cloud />
        </div>
      </div>
    </div>
  );
};

interface BreadcrumbProps {
  children: React.ReactNode;
  component?: keyof JSX.IntrinsicElements;
}

function Breadcrumb({ children, component: Component = "p" }: BreadcrumbProps) {
  const childrens = Children.toArray(children);
  return (
    <Component className="breadcrumb space-x-1 text-xl font-bold leading-6">
      {childrens.map((child, index) => (
        <Fragment key={index}>
          {child}
          {index < childrens.length - 1 && <span className="sep">/</span>}
        </Fragment>
      ))}
    </Component>
  );
}

export default Info;
