const withTM = require("next-transpile-modules");
const withPlugins = require("next-compose-plugins");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["avatars.githubusercontent.com"],
	},
	async redirects() {
		return [{ source: "/", destination: "/home", permanent: true }];
	},
};

module.exports = withPlugins(
	[[withTM(["react-syntax-highlighter"]), { transpileModules: ["react-syntax-highlighter"] }]],
	nextConfig
);
