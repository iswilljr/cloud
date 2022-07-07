import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "components/Header";
import Tree from "components/Tree";
import Info from "components/Info";
import { useEffect, useState } from "react";
import { LoadingContext } from "context/loading-context";
import "styles/globals.css";
import "github-markdown-css/github-markdown-light.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  const pathname = pageProps.pathname ?? "/";

  useEffect(() => setIsLoading(false), [pathname]);

  return (
    <>
      <Head>
        <title>{`Deno - ${pathname}`}</title>
        <meta name="description" content="Home cloud" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && (
        <div className="fixed w-full">
          <progress className="absolute top-0 linear-progress w-full" />
        </div>
      )}
      <Header />
      <main className="app">
        <Tree pathname={pathname} />
        <div className="app-main">
          <div className="app-content">
            <div className="app-display">
              <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
                <Component {...pageProps} />
              </LoadingContext.Provider>
            </div>
          </div>
          <Info info={pageProps.response?.info} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
