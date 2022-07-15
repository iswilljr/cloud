import fs from "fs/promises";
import { execa } from "execa";
import address from "address";

const argPort = process.argv.findIndex((arg) => arg === "--port" || arg === "-p");
const PORT = argPort !== -1 && process.argv[argPort + 1];

const HOST = address.ip();

(async () => {
  let env = await fs.readFile(".env.local", "utf8");
  const getValue = (key) => env.match(new RegExp(`${key}\=(.*)\n`))?.[1];
  const replace = (key, value) => env.replace(getValue(key), value);
  const addValue = (key, value) => (env += `\n${key}=${value}\n`);

  const PARSED_PORT = PORT || getValue("PORT") || 3000;
  const NEXT_PUBLIC_API_URL = `http://${HOST}:${PARSED_PORT}/api`;

  const portKey = "PORT";
  if (env.includes(portKey)) env = replace(portKey, PARSED_PORT);
  else addValue(portKey, PARSED_PORT);
  const apiUrlKey = "NEXT_PUBLIC_API_URL";
  if (env.includes(apiUrlKey)) env = replace(apiUrlKey, NEXT_PUBLIC_API_URL);
  else addValue(apiUrlKey, NEXT_PUBLIC_API_URL);

  await fs.writeFile(".env.local", env);

  execa("yarn", ["next", "start", "-p", PARSED_PORT, "-H", HOST], {
    stdout: "inherit",
    stderr: "inherit",
  });
})();
