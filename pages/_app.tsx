import type { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "components/Footer";
import { usePath } from "utils/get-path";
import "styles/globals.css";
import Header from "components/Header";

const Layout = dynamic(() => import("components/Layout"));

function MyApp({ Component, pageProps }: AppProps) {
  const { ui } = usePath();

  return ui ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Home Cloud</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Header color="#000" />
      <main className="flex flex-1 items-center justify-center">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
