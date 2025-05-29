import React, { createContext, useContext, useState } from "react";
import type { SheetMusic } from "../models/SheetMusic";

type SheetMusicContextType = {
  sheetMusic: SheetMusic[] | null;
  setSheetMusic: React.Dispatch<React.SetStateAction<SheetMusic[] | null>>;
};

const SheetMusicContext = createContext<SheetMusicContextType | undefined>(
  undefined
);

export const SheetMusicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sheetMusic, setSheetMusic] = useState<SheetMusic[] | null>(null);
  return (
    <SheetMusicContext.Provider value={{ sheetMusic, setSheetMusic  }}>
      {children}
    </SheetMusicContext.Provider>
  );
};

export const useSheetMusicContext = () => {
  const context = useContext(SheetMusicContext);
  if (!context) {
    throw new Error("useSheetMusic must be used within a SheetMusicProvider");
  }
  return context;
};
