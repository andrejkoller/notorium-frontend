import React, { useState } from "react";
import type { SheetMusic } from "../models/sheet-music";
import { SheetMusicContext } from "../contexts/sheet-music-context";

export const SheetMusicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sheetMusic, setSheetMusic] = useState<SheetMusic[] | null>(null);

  return (
    <SheetMusicContext.Provider value={{ sheetMusic, setSheetMusic }}>
      {children}
    </SheetMusicContext.Provider>
  );
};
