import { useContext } from "react";
import { SheetMusicContext } from "../contexts/sheet-music-context";

export const useSheetMusicContext = () => {
  const context = useContext(SheetMusicContext);
  if (!context) {
    throw new Error(
      "useSheetMusicContext must be used within a SheetMusicProvider"
    );
  }
  return context;
};
