import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ls, download, blob } from "./routes";
import { enoent, err } from "./middlewares";

const port = process.env.PORT || 4000;

const app = express();

app.set("port", +port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Home cloud API"));
app.use("/ls", ls);
app.use("/blob", blob);
app.use("/download", download);

app.use(enoent);
app.use(err);

app.use("*", (req, res) => res.status(404).json({ success: false, message: "Path no found" }));

export default app;
