import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Info, Item, TypeHtml, TypeMedia, TypeText } from "api/Response";

export interface AppState {
	success: boolean;
	loading: boolean;
	info: Info;
	directories: Item[];
	files: Item[];
	pathname: string;
	fileInfo: TypeText | TypeHtml | TypeMedia;
}

const initialState: AppState = {
	success: false,
	loading: true,
	info: {
		created: 0,
		id: 0,
		isDirectory: false,
		isFile: false,
		modified: 0,
		name: "",
		path: "",
		readme: null,
		size: "",
	},
	directories: [],
	files: [],
	pathname: "/",
	fileInfo: {
		type: "text",
		data: "",
	},
};

export const counterSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setSuccess: (state, action: PayloadAction<boolean>) => {
			state.success = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setInfo: (state, action: PayloadAction<Info>) => {
			state.info = action.payload;
		},
		setDirectories: (state, action: PayloadAction<Item[]>) => {
			state.directories = action.payload;
		},
		setFiles: (state, action: PayloadAction<Item[]>) => {
			state.files = action.payload;
		},
		setPathname: (state, action: PayloadAction<string>) => {
			state.pathname = action.payload;
		},
		setFileInfo: (state, action: PayloadAction<TypeText | TypeHtml | TypeMedia>) => {
			state.fileInfo = action.payload;
		},
	},
});

export const { setSuccess, setLoading, setInfo, setDirectories, setFiles, setPathname, setFileInfo } =
	counterSlice.actions;

export const selectSuccess = (state: RootState) => state.app.success;
export const selectIsLoading = (state: RootState) => state.app.loading;
export const selectInfo = (state: RootState) => state.app.info;
export const selectDirectories = (state: RootState) => state.app.directories;
export const selectFiles = (state: RootState) => state.app.files;
export const selectPathname = (state: RootState) => state.app.pathname;
export const selectFileInfo = (state: RootState) => state.app.fileInfo;

export default counterSlice.reducer;
