import { useEffect } from "react";
import { getAllSheetMusic } from "../services/SheetMusicService";
import { Link } from "react-router-dom";
import { SelectFilter } from "./SelectFilter";
import { useSheetMusicContext } from "../contexts/SheetMusicContext";

export default function Home() {
  const { sheetMusic, setSheetMusic } = useSheetMusicContext();

  function formatGenre(genre: string) {
    return genre.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

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
  }, [setSheetMusic]);

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <h1>Explore sheet music</h1>
          <div className="home-filters">
            <SelectFilter />
          </div>
        </div>
        <div className="home-body">
          {sheetMusic && sheetMusic.length > 0 ? (
            <ul className="sheet-music-list">
              {sheetMusic.map(
                (music) =>
                  music.isPublic && (
                    <li key={music.id} className="sheet-music-item">
                      <Link
                        to={`/user/${music.user?.username}/scores/${music.id}`}
                        className="sheet-music-link"
                      >
                        <img
                          src={`https://localhost:7189/${music.previewImage}`}
                          alt={music.title}
                          className="sheet-music-image"
                        />
                      </Link>
                      <Link
                        to={`/user/${music.user?.username}/scores/${music.id}`}
                        className="sheet-music-title"
                      >
                        <h2 className="sheet-music-title">{music.title}</h2>
                      </Link>
                      <p className="sheet-music-composer">{music.composer}</p>
                      <div className="sheet-music-genre-instrument">
                        <p className="sheet-music-instrument">
                          {music.instrument}
                        </p>
                        <span>-</span>
                        <p className="sheet-music-genre">
                          {formatGenre(music.genre)}
                        </p>
                      </div>
                      <p className="sheet-music-author">
                        Uploaded by {music?.user?.name}
                      </p>
                      <p className="sheet-music-date">
                        {new Date(music.uploadedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </li>
                  )
              )}
            </ul>
          ) : (
            <p>No sheet music available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
