import fs from "fs/promises";
import path from "path";
import shelljs from "shelljs";
import prompts from "prompts";
import logger from "./logger.js";

const onCancel = () => process.exit(1);

export enum Repos {
	Github = "github",
	Deno = "deno",
}

export type PackageManager = "npm" | "yarn" | "pnpm";

export async function getFolderName(): Promise<string> {
	const message = "Enter a name for your project...";
	const initial = "cloud";
	return (await prompts({ type: "text", name: "name", message, initial }, { onCancel })).name ?? "cloud";
}

export async function getRepos(): Promise<Repos[]> {
	const choices = [
		{ title: "Github", value: Repos.Github },
		{ title: "Deno", value: Repos.Deno },
	];
	const message = "Select templates sites to install...";
	const type = "multiselect";
	return (await prompts({ type, name: "repos", message, choices, min: 1 }, { onCancel })).repos ?? [Repos.Github];
}

export async function getPackageManager(packageManager?: PackageManager): Promise<PackageManager> {
	const defaultPM = "npm";
	const hasYarn = shelljs.exec("yarn --version", { silent: true }).code === 0;
	const hasPnpm = shelljs.exec("pnpm --version", { silent: true }).code === 0;

	if (packageManager) {
		if (packageManager === defaultPM) return defaultPM;
		if ((packageManager === "yarn" && hasYarn) || (packageManager === "pnpm" && hasPnpm)) return packageManager;
		else logger.info(`Selected package manager ${packageManager} is not installed.`);
	}
	if (!hasYarn && !hasPnpm) {
		if (packageManager) logger.info(`${packageManager} is not installed. Using ${defaultPM} instead.`);
		return defaultPM;
	}

	const choices = ["npm", hasYarn && "yarn", hasPnpm && "pnpm"]
		.filter((p): p is string => !!p)
		.map((p) => ({ title: p, value: p }));
	const message = "Select a package manager...";
	const name = "pm";

	return (await prompts({ type: "select", name, message, choices }, { onCancel })).pm ?? defaultPM;
}

export function getScripts(repo: string, folderName: string, rootdir: string, packageManager: PackageManager) {
	const repoPath = path.join(rootdir, `${folderName}/cloud-${repo}`);
	const downloadScript = `
mkdir -p ${repoPath}
cd ${repoPath}
curl https://codeload.github.com/iswilljr/cloud/tar.gz/master | \
tar -xz --strip=2 cloud-master/cloud-${repo}
`;
	const installScript = `
cd ${repoPath}
${packageManager} install
`;
	return { downloadScript, installScript, repoPath };
}

export async function existDir(dir: string) {
	return await fs
		.access(dir)
		.then(() => true)
		.catch(() => false);
}

interface MakeDirOptions {
	rootdir: string;
	repo: string;
	folderName: string;
	packageManager: PackageManager;
	installDeps: boolean;
}

export function makeDir({ repo, installDeps, folderName, packageManager, rootdir }: MakeDirOptions): Promise<void> {
	return new Promise((resolve, reject) => {
		logger.info(`Installing cloud-${repo}...`);
		const { downloadScript, installScript } = getScripts(repo, folderName, rootdir, packageManager);
		const downloaded = shelljs.exec(downloadScript, { silent: true, async: true });
		downloaded.on("exit", () => {
			logger.success(`cloud-${repo} installed.`);
			if (installDeps) {
				logger.info(`Installing cloud-${repo} dependencies with ${packageManager}...`);
				const installed = shelljs.exec(installScript, { silent: true, async: true });
				installed.on("exit", () => {
					logger.success(`${repo} dependencies installed.`);
					resolve(undefined);
				});
				installed.on("error", reject);
			} else resolve(undefined);
		});
		downloaded.on("error", reject);
	});
}

export default async function createHomeCloud(
	rootdir: string,
	folderName?: string,
	repos?: string,
	packageManager?: PackageManager,
	skipInstall?: boolean
) {
	const parsedFolderName = folderName || (await getFolderName());
	const parsedRepos = ["api", ...(repos ? repos.split(",").filter((r) => r === "github" || r === "deno") : [])];
	if (parsedRepos.length === 1) {
		if (repos) logger.info("invalid repos, asking for repos...");
		parsedRepos.push(...(await getRepos()));
	}
	const parsedPM = await getPackageManager(packageManager);

	const existFolderName = await existDir(path.join(rootdir, parsedFolderName));
	if (existFolderName) {
		logger.error(`Folder ${logger.path(parsedFolderName)} already exists.`);
		process.exit(1);
	}

	logger.info(`Creating folder ${logger.path(parsedFolderName)}...`);
	logger.newLine();

	await parsedRepos.reduce(async (prev, repo) => {
		await prev;
		return makeDir({
			repo,
			folderName: parsedFolderName,
			installDeps: !skipInstall,
			packageManager: parsedPM,
			rootdir,
		});
	}, Promise.resolve());

	const usingNpm = parsedPM === "npm";

	logger.newLine();
	logger.success(`${parsedFolderName} successfully setup.`);
	console.log(`To get started, run:
  ${logger.cyan(`cd ${parsedFolderName}/cloud-api`)}
  ${logger.cyan(`${parsedPM} ${usingNpm ? "run " : ""}build`)}
  ${logger.cyan(`${parsedPM} ${usingNpm ? "run " : ""}setup`)}
  ${logger.cyan(`${parsedPM} start`)}
`);
	logger.info(`For more information, visit: ${logger.url("https://iswilljr.github.io/cloud/docs/getting-started")}`);
}
