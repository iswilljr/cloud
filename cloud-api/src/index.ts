import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ls, download } from "./routes";
import { enoent, eexist, err } from "./middlewares";

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Home cloud API"));
app.use("/ls", ls);
app.use("/download", download);

app.use(enoent);
app.use(eexist);
app.use(err);

app.listen(port, () => console.log("Server running on port", +port));
