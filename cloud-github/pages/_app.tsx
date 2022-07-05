import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/Layout/Layout";
import "styles/globals.css";
import "github-markdown-css/github-markdown-dark.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{`Github - ${pageProps.pathname ?? "/"}`}</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
				<link rel="shortcut icon" href="/favicon.svg" />
			</Head>

			<MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
				<Layout
					app={{
						pathname: pageProps.pathname ?? "/",
						response: pageProps.response ?? { success: false },
						type: pageProps.type ?? "",
					}}
				>
					<Component {...pageProps} />
				</Layout>
			</MantineProvider>
		</>
	);
}
