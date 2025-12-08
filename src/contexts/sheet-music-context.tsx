import { createContext } from "react";
import type { SheetMusic } from "../models/sheet-music";

export type SheetMusicContextType = {
  sheetMusic: SheetMusic[] | null;
  setSheetMusic: React.Dispatch<React.SetStateAction<SheetMusic[] | null>>;
};

export const SheetMusicContext = createContext<
  SheetMusicContextType | undefined
>(undefined);
