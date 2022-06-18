import { config } from "dotenv";
import path from "path";
import colors from "colors";
import fs from "fs/promises";
import { clearAndWrite, prompt } from "./lib/setup";
config();

const HOME_CLOUD_STORAGE = process.env.HOME_CLOUD_STORAGE;
const TOKEN = process.env.TOKEN;

const startServerLog = `To start the server, run ${colors.cyan("yarn start")}`;

const setEnvVariables = async () => {
	const storage = await prompt("Enter your storage path: ", {
		noDataMsg: "Enter a valid path: ",
		validateErrorMsg: "Path not found, enter a valid path: ",
		validate(data) {
			return new Promise((resolve) => {
				if (!path.isAbsolute(data)) resolve(false);
				else
					fs.access(data)
						.then(() => resolve(true))
						.catch(() => resolve(false));
			});
		},
	});
	const token = await prompt("Enter your token: ", { validate: () => true });

	const storageKey = `HOME_CLOUD_STORAGE=${storage.replace(/\/$/, "")}`;
	const tokenKey = `TOKEN=${token}`;

	await fs.writeFile(path.join(__dirname, "../.env"), `${storageKey}\n${tokenKey}\n`, "utf-8");
	console.log(
		`Storage path set to: ${colors.cyan(storage)}\n${colors.green("Token set successfully!")}\n${startServerLog}`
	);
	process.exit(0);
};

if (!HOME_CLOUD_STORAGE && !TOKEN) setEnvVariables();
else {
	(async () => {
		clearAndWrite(`Storage path: ${colors.green(HOME_CLOUD_STORAGE ?? "")}\nToken is set`);
		const overwrite = await prompt("\nDo you want to overwrite the token? (y/n): ", {
			validate: (data) => data === "y" || data === "n",
		});
		if (overwrite === "y") setEnvVariables();
		else {
			console.log(`${startServerLog}`);
			process.exit(0);
		}
	})();
}
