const withTM = require("next-transpile-modules");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins(
	[
		[
			withTM(["react-syntax-highlighter"]),
			{
				transpileModules: ["react-syntax-highlighter"],
			},
		],
	],
	{
		reactStrictMode: true,
		async redirects() {
			return [
				{
					source: "/",
					destination: "/home",
					permanent: true,
				},
				// {
				//   source: '/:path((?!home$).*)',
				// 	destination: "/home",
				// 	permanent: true,
				// }
			];
		},
	}
);
