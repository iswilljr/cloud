import logger from "./logger.js";
import shelljs from "shelljs";
import prompts from "prompts";

async function getName(): Promise<string> {
	return (
		(
			(await prompts(
				{ type: "text", name: "name", message: "Enter a name for your project...", initial: "cloud" },
				{ onCancel: () => process.exit(1) }
			)) as { name?: string }
		).name ?? "cloud"
	);
}

type PackageManager = "npm" | "yarn" | "pnpm";

async function getPackageManager(packageManager?: PackageManager): Promise<PackageManager> {
	const defaultPackageManager = "npm";
	const hasYarn = shelljs.exec("yarn --version", { silent: true }).code === 0;
	const hasPnpm = shelljs.exec("pnpm --version", { silent: true }).code === 0;

	if (packageManager) {
		if (packageManager === defaultPackageManager) return defaultPackageManager;
		if ((packageManager === "yarn" && hasYarn) || (packageManager === "pnpm" && hasPnpm)) return packageManager;
		else logger.info(`Selected package manager ${packageManager} is not installed.`);
	}

	if (!hasYarn && !hasPnpm) {
		if (packageManager) logger.info(`${packageManager} is not installed. Using ${defaultPackageManager} instead.`);
		return defaultPackageManager;
	}

	const choices = ["npm", hasYarn && "yarn", hasPnpm && "pnpm"]
		.filter((p): p is string => Boolean(p))
		.map((p) => ({ title: p, value: p }));

	return (
		(
			(await prompts(
				{ type: "select", name: "packageManager", message: "Select a package manager...", choices },
				{ onCancel: () => process.exit(1) }
			)) as { packageManager?: PackageManager }
		).packageManager ?? defaultPackageManager
	);
}

enum Repos {
	Github = "github",
	Deno = "deno",
}

async function getRepos(): Promise<Repos[]> {
	const choices = [
		{ title: "Github", value: Repos.Github },
		{ title: "Deno", value: Repos.Deno },
	];
	return (
		(
			(await prompts(
				{ type: "multiselect", name: "repos", message: "Select templates sites to install...", choices, min: 1 },
				{ onCancel: () => process.exit(1) }
			)) as { repos?: Repos[] }
		).repos ?? [Repos.Github]
	);
}

export { getName, getPackageManager, getRepos };
