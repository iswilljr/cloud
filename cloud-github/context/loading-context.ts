import { createContext, Dispatch, SetStateAction } from "react";

// export const LoadingContext = createContext<boolean>(true);

interface Loading {
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<Loading>({
	isLoading: true,
	setIsLoading: () => undefined,
});

LoadingContext.displayName = "isLoading";
