import "styles/globals.css";
import "styles/markdown.css";
import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "components/Layout";
import Loading from "components/Loading";
import { LoadingContext } from "context/loading-context";

export default function App({ Component, pageProps }: AppProps) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isLoading) setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageProps.pathname]);

	return (
		<>
			<Head>
				<title>
					Github - {pageProps.response && pageProps.response.success ? pageProps.pathname ?? "/" : "Page not found"}
				</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
				<link rel="icon" href="/favicon.svg" />
			</Head>
			<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
				<MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
					<Loading />
					<Layout
						app={{
							pathname: pageProps.pathname ?? "/",
							response: pageProps.response ?? { success: false, message: "" },
							type: pageProps.type ?? "list",
						}}
					>
						<Component {...pageProps} />
					</Layout>
				</MantineProvider>
			</LoadingContext.Provider>
		</>
	);
}
