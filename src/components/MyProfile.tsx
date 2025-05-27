import { useEffect, useState } from "react";
import { Card, Dialog, Portal } from "@chakra-ui/react";
import ProfileDialog from "./dialogs/ProfileDialog";
import { useCurrentUser } from "../contexts/UserContext";
import { getCurrentUserSheetMusic } from "../services/SheetMusicService";
import type { SheetMusic } from "../models/SheetMusic";
import { Link } from "react-router-dom";

export default function MyProfile() {
  const { currentUser, setCurrentUser } = useCurrentUser();
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
    <Dialog.Root>
      <Card.Root className="profile-card">
        <Card.Body className="profile-body">
          {currentUser ? (
            <div className="profile-details">
              <div className="profile-details-wrapper">
                <div className="profile-image">
                  <span>
                    {currentUser.name?.charAt(0).toUpperCase() ?? "?"}
                  </span>
                </div>
                <div className="profile-username">
                  <p>Profile</p>
                  <div className="profile-username-text">
                    <Dialog.Trigger asChild>
                      <h2>{currentUser.name}</h2>
                    </Dialog.Trigger>
                    <p>@{currentUser.username}</p>
                  </div>
                </div>
              </div>
              <div className="profile-description">
                <p>{currentUser.description || "No description provided."}</p>
              </div>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <ProfileDialog
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
          <div className="profile-scores">
            <div className="profile-scores-title">
              <h3>Last published scores</h3>
            </div>
            {loadingScores ? (
              <p>Loading scores...</p>
            ) : sheetMusic.length > 0 ? (
              <ul className="profile-scores-list">
                {sheetMusic.map(
                  (music) =>
                    music.isPublic && (
                      <li key={music.id} className="profile-scores-item">
                        <Link
                          to={`/scores/${music.id}`}
                          className="profile-scores-link"
                        >
                          <img
                            src={`https://localhost:7189/${music.previewImage}`}
                            alt={music.title}
                            className="profile-scores-image"
                          />
                        </Link>
                        <Link
                          to={`/scores/${music.id}`}
                          className="profile-scores-title"
                        >
                          <h2 className="profile-scores-title">
                            {music.title}
                          </h2>
                        </Link>
                        <p className="profile-scores-composer">
                          {music.composer}
                        </p>
                        <div className="profile-scores-genre-instrument">
                          <p className="profile-scores-instrument">
                            {music.instrument}
                          </p>
                          <span>-</span>
                          <p className="profile-scores-genre">
                            {formatGenre(music.genre)}
                          </p>
                        </div>
                        <p className="profile-scores-author">
                          Uploaded by {music?.user?.name}
                        </p>
                        <p className="profile-scores-date">
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
        </Card.Body>
      </Card.Root>
    </Dialog.Root>
  );
}
