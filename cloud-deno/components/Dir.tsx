import { selectDirectories, selectFiles, selectPathname } from "app/appSlice";
import { useAppSelector } from "app/hooks";
import React from "react";
import Display from "./Display";

const Dir = () => {
	const pathname = useAppSelector(selectPathname);
	const directories = useAppSelector(selectDirectories);
	const files = useAppSelector(selectFiles);
	
	return (
		<>
			{pathname !== "/" && <Display isDirectory goBack name=".." />}
			{directories?.map((dir) => (
				<Display key={dir.name} {...dir} />
			))}
			{files?.map((file) => (
				<Display key={file.name} {...file} />
			))}
		</>
	);
};

export default Dir;
