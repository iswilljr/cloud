import os from "os";
import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Haandler(_: NextApiRequest, res: NextApiResponse) {
  return res.json(await fs.readdir(os.homedir() + "/dev"));
}
