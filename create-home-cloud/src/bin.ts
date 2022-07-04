#!/usr/bin/env node
import path from "path";
import fs from "fs/promises";
import { createRequire } from "module";
import { Option, program } from "commander";
import shelljs from "shelljs";
import { execa } from "execa";
import logger from "./logger.js";
import { getName, getPackageManager, getRepos } from "./index.js";

const packageJson = createRequire(import.meta.url)("../package.json");
const baseUrl = "https://github.com/iswilljr/cloud-";
const dir = process.cwd();

async function cloneAndInstallDeps(repo: string, name: string, skipInstall: boolean, pm: string) {
	logger.info(`Installing ${repo}...`);
	const repoUrl = `${baseUrl}${repo}`;
	const repoPath = path.join(dir, `${name}/cloud-${repo}`);
	await execa("git", ["clone", repoUrl, repoPath]);
	logger.success(`${repo} installed.`);
	if (!skipInstall) {
		shelljs.cd(repoPath);
		logger.info(`Installing ${repo} dependencies with ${pm}...`);
		await execa(pm, ["install"]);
		logger.success(`${repo} dependencies installed.`);
	}
	Promise.resolve();
}

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
	.action(async (name, r, { packageManager, skipInstall }) => {
		name = name || (await getName());
		let repos = r ? (r as string).split(",").filter((r) => r === "github" || r === "deno") : [];
		if (!repos.length) {
			if (r) logger.info("invalid repos, asking for repos...");
			repos = await getRepos();
		}
		repos.unshift("api");
		packageManager = await getPackageManager(packageManager);
		await fs.mkdir(path.resolve(name)).catch(() => {
			logger.error(`directory ${name} already exists.`);
			process.exit(1);
		});
		await repos.reduce(async (prev, repo) => {
			await prev;
			return cloneAndInstallDeps(repo, name, skipInstall, packageManager);
		}, Promise.resolve());
		
		logger.success(`${name} successfully setup.`);
		logger.newLine()
		console.log("To get started, run:");
		console.log("    cd", logger.cyan("cloud-api"));
		console.log(`   `, logger.cyan(packageManager), "run", logger.cyan("cloud-deno"));
		logger.newLine();
		logger.info(`For more information, visit: ${logger.url("https://iswilljr.github.io/cloud/docs/getting-started")}`);
	});

program.parse(process.argv);

if (!process.argv.slice(1).length) {
	program.outputHelp();
}

process.on("unhandledRejection", (err: any) => {
	logger.newLine();
	logger.error(`unexpected error: ${err.message}`);
	logger.newLine();
	process.exit(1);
});
