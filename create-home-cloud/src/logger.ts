import chalk from "chalk";

const logger = {
	error: (msg: string) => console.error(`${chalk.red("error")} ${msg}`),
	success: (msg: string) => console.log(`${chalk.green("success")} ${msg}`),
	info: (msg: string) => console.info(`${chalk.blue("info")} ${msg}`),
	warn: (msg: string) => console.warn(`${chalk.yellow("warning")} ${msg}`),
	path: (msg: string) => chalk.cyan.underline(`"${msg}"`),
	url: (msg: string) => chalk.cyan.underline(msg),
	newLine: () => console.log(),
	cyan: chalk.cyan,
};

export default logger;
