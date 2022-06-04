import { config } from "dotenv";
import path from "path";
import fs from "fs/promises";
config();

const HOME_CLOUD_STORAGE = process.env.HOME_CLOUD_STORAGE;

const setStorage = () => {
	let storage = "";
	process.stdout.write("\x1BcIngrese la ruta de almacenamiento: ");
	process.stdin.on("data", (d) => {
		const data = d.toString().trim();
		if (data.length && path.isAbsolute(data)) {
			fs.access(data)
				.then(() => {
					storage = data;
					process.stdin.emit("end");
				})
				.catch(() => {
					process.stdout.write("Ruta no encontrada, ingrese una correcta: ");
				});
		} else process.stdout.write("Ingrese una ruta válida: ");
	});
	process.stdin.resume();
	process.stdin.on("end", () => {
		if (!storage) {
			console.log("No se ingreso ninguna ruta de almacenamiento");
			process.exit(1);
		}
		fs.writeFile(path.join(__dirname, "../.env"), `HOME_CLOUD_STORAGE=${storage}`, { encoding: "utf-8" })
			.then(() => {
				console.log("Se ha creado el archivo de configuración");
				console.log("Ruta de almacenamiento:", storage);
				console.log("Para iniciar el servidor, ejecute 'npm run start'");
				process.exit(0);
			})
			.catch(() => {
				console.log("No se pudo crear el archivo de configuración");
				process.exit(1);
			});
	});
};

if (!HOME_CLOUD_STORAGE) {
	setStorage();
} else {
	console.log("\x1BcRuta de almacenamiento:", HOME_CLOUD_STORAGE);
	process.stdout.write("¿Desea cambiar la ruta de almacenamiento? (s/n): ");
	const setdata = (d: Buffer) => {
		const data = d.toString().trim();
		if (data === "s") {
			process.stdin.emit("end");
			process.stdin.removeListener("data", setdata);
			setStorage();
		} else {
			console.log("Para iniciar el servidor, ejecute 'npm run start'");
			process.exit(0);
		}
	};
	process.stdin.on("data", setdata);
}
