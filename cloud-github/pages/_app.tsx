import "styles/globals.css";
import "styles/markdown/github-markdown-dark.css";
import "styles/markdown/github-dark.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Layout } from "components/Layout/Layout";
import { AppProps } from "next/app";
import { LoadingContext } from "context/loading-context";
import Loading from "components/Loading/Loading";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			<Head>
				<title>Github</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
				<link rel="icon" href="/favicon.svg" />
			</Head>
			<MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
				<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
					<Loading />
					<Layout pathname={pageProps.pathname ?? "/"} response={pageProps.response ?? { success: false, message: "" }}>
						<Component {...pageProps} />
					</Layout>
				</LoadingContext.Provider>
			</MantineProvider>
		</>
	);
}
