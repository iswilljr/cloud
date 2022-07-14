import Header from "components/Header";
import Info from "components/Info";
import Head from "next/head";
import Footer from "components/Footer";
import { usePath } from "utils/get-path";

function Layout({ children }: { children: React.ReactNode }) {
  const { ui, pathname } = usePath();
  const title = pathname === "/" ? "Home" : `/Home${pathname}`.split(/\/+/g).slice(-2).join("/");
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>{`${title} | Cloud${ui ? (ui === "github" ? " Github" : " Deno") : ""}`}</title>
        <link rel="shortcut icon" href={`/${ui}/favicon.${ui === "github" ? "svg" : "ico"}`} type="image/x-icon" />
      </Head>
      <Header />
      <Info />
      <div className="app section-x-inset-xl w-full flex-1 py-6">
        <main className="flex h-full w-full flex-col gap-4 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
