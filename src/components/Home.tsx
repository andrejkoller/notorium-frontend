import { useEffect, useState } from "react";
import { getAllSheetMusic } from "../services/SheetMusicService";
import type { SheetMusic } from "../models/SheetMusic";
import { Card } from "@chakra-ui/react";

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
    <Card.Root className="home-card">
      <Card.Header className="home-header">
        <h1 className="home-title">Explore sheet music</h1>
      </Card.Header>
      <Card.Body className="home-body">
        {sheetMusic.length > 0 ? (
          <ul className="sheet-music-list">
            {sheetMusic.map((music) => (
              <li key={music.id} className="sheet-music-item">
                <h2 className="sheet-music-title">{music.title}</h2>
                <p className="sheet-music-composer">{music.composer}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sheet music available.</p>
        )}
      </Card.Body>
    </Card.Root>
  );
}
