import create from "zustand";

interface AlertState {
  show: boolean;
  message: string;
  type: "error" | "warn";
  setShow: (show: boolean) => void;
  setMessage: (message: string) => void;
  setType: (type: "error" | "warn") => void;
}

export const useAlertState = create<AlertState>((set) => ({
  show: false,
  message: "",
  type: "error",
  setMessage: (message) => set(() => ({ message })),
  setShow: (show) => set(() => ({ show })),
  setType: (type) => set(() => ({ type })),
}));
