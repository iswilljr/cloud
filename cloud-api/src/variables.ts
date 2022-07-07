import "dotenv/config";

const storage = process.env.HOME_CLOUD_STORAGE;
const token = process.env.TOKEN;

if (!storage || !token) {
  console.log("Environment variables not set");
  console.log("Run yarn setup to set them");
  process.exit(1);
}

export { storage, token };

export const IGNORE = /node_modules|\.git(?!(.))/gi;
