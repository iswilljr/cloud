import os from "os";
import { warn } from "next/dist/build/output/log";

// const warn = (...messages: any[]) => console.warn(chalk.yellow("warn"), "-", ...messages);

const HOME_CLOUD_STORAGE = process.env.HOME_CLOUD_STORAGE;
const storage = HOME_CLOUD_STORAGE || os.homedir();
const token = process.env.GH_TOKEN;
const IGNORE = /node_modules|\.git(?!(.))/gi;

if (!HOME_CLOUD_STORAGE) warn(`HOME_CLOUD_STORAGE is not set. Using ${storage} as default.`);
if (!token) warn(`GH_TOKEN is not set. Could not display files.`);

export { storage, token, IGNORE };
