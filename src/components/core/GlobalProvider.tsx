"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import StoreProvider from "@/redux/StoreProvider";
import TopBarTwo from "../common/Header/TopBarTwo";
import Navbar from "../common/Header/Navbar";

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const showTopbar = pathname !== "/";

  return (
    <StoreProvider>
      {showTopbar && (
        <>
          <TopBarTwo />
          <Navbar from="globalProvider" />
        </>
      )}
      {children}
    </StoreProvider>
  );
};

export default GlobalProvider;
