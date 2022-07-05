// @ts-check

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: "Cloud Docs",
	tagline: "The fullstack cloud project",
	url: "https://iswilljr.github.io/",
	baseUrl: "/cloud/",
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",
	organizationName: "iswilljr",
	projectName: "cloud/cloud-docs",
	trailingSlash: false,
	i18n: { defaultLocale: "en", locales: ["en"] },
	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					editUrl: "https://github.com/iswilljr/cloud/tree/master/cloud-docs/docs/",
				},
				theme: { customCss: require.resolve("./src/css/custom.css") },
			}),
		],
	],
	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: "Cloud Docs",
				logo: { alt: "Cloud Docs Logo", src: "img/logo.svg" },
				items: [
					{ type: "doc", docId: "getting-started", position: "left", label: "Get Started" },
					{ href: "https://github.com/iswilljr/cloud-docs", label: "GitHub", position: "right" },
				],
			},
			footer: {
				style: "dark",
				links: [
					{ title: "Docs", items: [{ label: "Tutorial", to: "/docs/intro" }] },
					{
						title: "Social",
						items: [{ label: "Twitter", href: "https://twitter.com/iswilljr" }],
					},
					{
						title: "More",
						items: [{ label: "GitHub", href: "https://github.com/iswilljr/" }],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Cloud Docs, iswilljr. Built with Docusaurus.`,
			},
			prism: { theme: lightCodeTheme, darkTheme: darkCodeTheme },
		}),
};

module.exports = config;
