#!/usr/bin/env node
import path from "path";
import fs from "fs/promises";
import { createRequire } from "module";
import { Option, program } from "commander";
import shelljs from "shelljs";
import logger from "./logger.js";
import createHomeCloud, { getFolderName, getPackageManager, getRepos } from "./index.js";

const packageJson = createRequire(import.meta.url)("../package.json");
const dir = process.cwd();

program.version(packageJson.version);

program
	.arguments("[name] [repos]")
	.description("Install templates sites")
	.addOption(
		new Option(
			"-p, --package-manager <manager>",
			"The package manager used to install dependencies. One of yarn, npm, and pnpm."
		).choices(["npm", "yarn", "pnpm"])
	)
	.option("-s, --skip-install", "Do not run package manager immediately after scaffolding", false)
	.action((name, repo, { packageManager, skipInstall }) =>
		createHomeCloud(dir, name, repo, packageManager, skipInstall)
	);

program.parse(process.argv);

process.on("unhandledRejection", (err: any) => {
	logger.newLine();
	logger.error(`unexpected error: ${err.message}`);
	logger.newLine();
	process.exit(1);
});
