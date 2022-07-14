import { createContext, Dispatch, SetStateAction } from "react";

interface Alert {
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  type: "error" | "warn";
  setType: Dispatch<SetStateAction<"error" | "warn">>;
}

export const AlertContext = createContext<Alert>({
  showAlert: false,
  setShowAlert: () => undefined,
  message: "",
  setMessage: () => undefined,
  type: "warn",
  setType: () => undefined,
});

AlertContext.displayName = "showAlert";
