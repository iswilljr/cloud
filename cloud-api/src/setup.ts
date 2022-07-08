import "dotenv/config";
import path from "path";
import fs from "fs/promises";
import inquirer from "inquirer";
import os from "os";

const HOME_CLOUD_STORAGE = process.env.HOME_CLOUD_STORAGE;
const TOKEN = process.env.TOKEN;

const setEnvVariables = async () => {
  const { storage, token } = await inquirer.prompt([
    {
      type: "input",
      name: "storage",
      message: "Enter your storage path",
      default: os.homedir(),
      async validate(data) {
        if (!path.isAbsolute(data)) return "Path must be absolute";
        // prettier-ignore
        return await fs.access(data).then(() => true).catch(() => "Path not found");
      },
    },
    { type: "password", name: "token", message: "Enter your token: ", validate: (t) => (t ? true : "Required") },
  ]);

  const env = `HOME_CLOUD_STORAGE=${storage.replace(/\/$/, "")}\nTOKEN=${token}\n`;
  await fs.writeFile(path.join(process.cwd(), ".env"), env, "utf-8");
  console.log("Env variables set");
};

if (!HOME_CLOUD_STORAGE || !TOKEN) setEnvVariables();
else {
  (async () => {
    const message = "Env variables are set, do you want to overwrite them?";
    const { overwrite } = await inquirer.prompt({ type: "confirm", message, name: "overwrite" });
    if (overwrite) setEnvVariables();
  })();
}
