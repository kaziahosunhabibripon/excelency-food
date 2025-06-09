"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./store";

interface StoreProviderProps {
  children: ReactNode;
}
const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer />
    </Provider>
  );
};
export default StoreProvider;
