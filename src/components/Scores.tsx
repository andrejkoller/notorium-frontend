import { Card } from "@chakra-ui/react";
import { useCurrentUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import type { SheetMusic } from "../models/SheetMusic";
import { Link } from "react-router-dom";
import { getCurrentUserSheetMusic } from "../services/SheetMusicService";
import { SelectFilter } from "./SelectFilter";

export default function Scores() {
  const { currentUser } = useCurrentUser();
  const [sheetMusic, setSheetMusic] = useState<SheetMusic[]>([]);
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
  }, [currentUser?.id]);

  return (
    <Card.Root className="scores-card">
      <Card.Header className="scores-header">
        <div className="scores-title-filter-wrapper">
          <h1 className="scores-title">All sheet music</h1>
          <div className="scores-filter">
            <SelectFilter />
          </div>
        </div>
      </Card.Header>
      <Card.Body className="scores-body">
        {loadingScores ? (
          <p>Loading scores...</p>
        ) : sheetMusic.length > 0 ? (
          <ul className="scores-list">
            {sheetMusic.map(
              (music) =>
                music.isPublic && (
                  <li key={music.id} className="scores-item">
                    <Link to={`/scores/${music.id}`} className="scores-link">
                      <img
                        src={`https://localhost:7189/${music.previewImage}`}
                        alt={music.title}
                        className="scores-image"
                      />
                    </Link>
                    <Link to={`/scores/${music.id}`} className="scores-title">
                      <h2 className="profile-scores-title">{music.title}</h2>
                    </Link>
                    <p className="scores-composer">{music.composer}</p>
                    <div className="scores-genre-instrument">
                      <p className="scores-instrument">{music.instrument}</p>
                      <span>-</span>
                      <p className="scores-genre">{formatGenre(music.genre)}</p>
                    </div>
                    <p className="scores-author">
                      Uploaded by {music?.user?.name}
                    </p>
                    <p className="scores-date">
                      {new Date(music.uploadedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </li>
                )
            )}
          </ul>
        ) : (
          <p>No scores published yet.</p>
        )}
      </Card.Body>
    </Card.Root>
  );
}
