import express from "express";
import cors from "cors";
import morgan from "morgan";
import list from "./routes/ls.js";
import blob from "./routes/blob.js";

const port = process.env.PORT || 4000;

const app = express();

app.set("port", +port);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/ls", list);
app.use("/blob", blob);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: any, res: any, next: any) => {
  const message = err.code === "ENOENT" ? "File or directory does not exist" : err.message;
  res.status(404).json({ success: false, message });
});

app.use("*", (_, res) => res.status(404).json({ success: false, message: "Route not found" }));

export default app;
