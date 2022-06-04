import { config } from "dotenv";
config();

const storage = process.env.HOME_CLOUD_STORAGE;
if (!storage) {
	console.log("Set env variable HOME_CLOUD_STORAGE to your storage path");
	console.log("Run 'npm run setup' to create storage directory");
	process.exit(1);
}

export default storage;
