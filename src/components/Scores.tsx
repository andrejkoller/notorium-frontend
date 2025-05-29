import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUserSheetMusic } from "../services/SheetMusicService";
import { SelectFilter } from "./SelectFilter";
import { useCurrentUserContext } from "../contexts/UserContext";
import { useSheetMusicContext } from "../contexts/SheetMusicContext";

export default function Scores() {
  const { currentUser } = useCurrentUserContext();
  const { sheetMusic, setSheetMusic } = useSheetMusicContext();
  const [loadingScores, setLoadingScores] = useState(true);

  function formatGenre(genre: string) {
    return genre.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  useEffect(() => {
    if (!currentUser?.id) return;
    setLoadingScores(true);
    getCurrentUserSheetMusic(currentUser.id)
      .then(setSheetMusic)
      .catch((error) => {
        console.error("Error fetching user's sheet music:", error);
        setSheetMusic([]);
      })
      .finally(() => setLoadingScores(false));
  }, [currentUser?.id, setSheetMusic]);

  return (
    <div className="scores-container">
      <div className="scores-content">
        <div className="scores-header">
          <h1>All sheet music</h1>
          <div className="scores-filter">
            <SelectFilter />
          </div>
        </div>
        <div className="scores-body">
          {loadingScores ? (
            <p>Loading scores...</p>
          ) : sheetMusic && sheetMusic.length > 0 ? (
            <ul className="scores-list">
              {sheetMusic.map(
                (music) =>
                  music.isPublic && (
                    <li key={music.id} className="scores-item">
                      <Link
                        to={`/user/${music.user?.username}/scores/${music.id}`}
                        className="scores-link"
                      >
                        <img
                          src={`https://localhost:7189/${music.previewImage}`}
                          alt={music.title}
                          className="scores-image"
                        />
                      </Link>
                      <Link
                        to={`/user/${music.user?.username}/scores/${music.id}`}
                        className="scores-title"
                      >
                        <h2 className="profile-scores-title">{music.title}</h2>
                      </Link>
                      <p className="scores-composer">{music.composer}</p>
                      <div className="scores-genre-instrument">
                        <p className="scores-instrument">{music.instrument}</p>
                        <span>-</span>
                        <p className="scores-genre">
                          {formatGenre(music.genre)}
                        </p>
                      </div>
                      <p className="scores-author">
                        Uploaded by {music?.user?.name}
                      </p>
                      <p className="scores-date">
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
            <p>No scores published yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
