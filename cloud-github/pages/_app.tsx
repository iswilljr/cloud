import "styles/globals.css";
import "styles/markdown/github-markdown-dark.css";
import "styles/markdown/github-dark.css";
import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import Layout from "components/Layout";
// import Loading from "components/Loading";
import { LoadingContext } from "context/loading-context";

export default function App({ Component, pageProps }: AppProps) {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			<Head>
				<title>Github - {pageProps.pathname ?? "/"}</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
				<link rel="icon" href="/favicon.svg" />
			</Head>
			<MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
				<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
					{/* <Loading /> */}
					<Layout
						app={{
							pathname: pageProps.pathname ?? "/",
							response: pageProps.response ?? { success: false, message: "" },
							type: pageProps.type ?? "list",
						}}
					>
						<Component {...pageProps} />
					</Layout>
				</LoadingContext.Provider>
			</MantineProvider>
		</>
	);
}
