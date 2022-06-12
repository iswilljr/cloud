module.exports = {
	// Test
	"**/*.(ts|js)": () => "yarn test",
	// Type check TypeScript files
	"**/*.(ts|js)": () => "yarn tsc --noEmit",

	// Lint & Prettify TS and JS files
	"**/*.(ts|js)": (filenames) => [`yarn eslint ${filenames.join(" ")}`, `yarn prettier --write ${filenames.join(" ")}`],

	// Prettify only Markdown and JSON files
	"**/*.(md|json)": (filenames) => `yarn prettier --write ${filenames.join(" ")}`,
};
