import { useEffect, useState } from "react";
import { SelectFilter } from "./SelectFilter";
import { SelectOrder } from "./SelectOrder";
import { getAllSheetMusic } from "../services/SheetMusicService";
import type { SheetMusic } from "../models/SheetMusic";

export default function Home() {
  const [sheetMusic, setSheetMusic] = useState<SheetMusic[]>([]);

  useEffect(() => {
    const fetchSheetMusic = async () => {
      try {
        const music = await getAllSheetMusic();
        setSheetMusic(music);
      } catch (error) {
        console.error("Error fetching sheet music:", error);
      }
    };

    fetchSheetMusic();
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <div className="home-header-title">
            <h1>Explore sheet music</h1>
          </div>
          <div className="home-header-filter">
            <div className="home-header-select-filter">
              <SelectFilter />
            </div>
            <div className="home-header-select-order">
              <SelectOrder />
            </div>
          </div>
        </div>
        <div className="home-body">
          {sheetMusic.length > 0 ? (
            <div className="sheet-music-list">
              {sheetMusic.map((music) => (
                <div key={music.id} className="sheet-music-item">
                  <h2>{music.title}</h2>
                  <p>{music.composer}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No sheet music available. Please try again later.</p>
          )}
        </div>
      </div>
    </div>
  );
}
