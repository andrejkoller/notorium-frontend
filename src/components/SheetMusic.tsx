import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { SheetMusic } from "../models/SheetMusic";
import {
  addSheetMusicToFavorites,
  getSheetMusicById,
  removeSheetMusicFromFavorites,
} from "../services/SheetMusicService";
import { Download, Heart, HeartOff, Printer, Share2 } from "lucide-react";
import { Toaster, toaster } from "./ui/toaster";
import { useCurrentUserContext } from "../contexts/UserContext";

export default function MusicSheet() {
  const [score, setScore] = useState<SheetMusic | null>(null);
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  const isFavorited = currentUser?.favoriteSheetMusic?.some(
    (s) => s.id === score?.id
  );

  const { username, scoreId } = useParams<{
    username: string;
    scoreId: string;
  }>();

  const handleFavoriteSubmit = () => {
    if (score) {
      addSheetMusicToFavorites(Number(scoreId), score.user?.id)
        .then(() => {
          if (currentUser && setCurrentUser) {
            setCurrentUser({
              ...currentUser,
              favoriteSheetMusic: [
                ...(currentUser.favoriteSheetMusic || []),
                score,
              ],
            });
          }
          toaster.success({
            title: "Added to Favorites",
            description: `${score.title} has been added to your favorites.`,
          });
        })
        .catch((error) => {
          console.error("Error adding sheet music to favorites:", error);
          toaster.error({
            title: "Error",
            description: "Failed to add sheet music to favorites.",
          });
        });
    } else {
      console.error("No sheet music available to favorite.");
    }
  };

  const handleUnfavoriteSubmit = () => {
    if (score) {
      removeSheetMusicFromFavorites(Number(scoreId), score.user?.id)
        .then(() => {
          if (currentUser && setCurrentUser) {
            setCurrentUser({
              ...currentUser,
              favoriteSheetMusic: currentUser.favoriteSheetMusic?.filter(
                (s) => s.id !== score.id
              ),
            });
          }
          toaster.success({
            title: "Removed from Favorites",
            description: `${score.title} has been removed from your favorites.`,
          });
        })
        .catch((error) => {
          console.error("Error removing sheet music from favorites:", error);
          toaster.error({
            title: "Error",
            description: "Failed to remove sheet music from favorites.",
          });
        });
    } else {
      console.error("No sheet music available to unfavorite.");
    }
  };

  useEffect(() => {
    if (scoreId) {
      getSheetMusicById(Number(scoreId))
        .then((data) => setScore(data))
        .catch((error) => {
          console.error("Error fetching sheet music:", error);
          setScore(null);
        });
    }
  }, [scoreId]);

  return (
    <>
      <div className="music-sheet-container">
        <div className="music-sheet-content">
          <div className="music-sheet-body">
            <div className="music-sheet">
              {score ? (
                <div className="music-sheet-details">
                  <img
                    src={`https://localhost:7189/${score.previewImage}`}
                    alt={score.title}
                    className="music-sheet-image"
                  />
                </div>
              ) : (
                <p>Loading sheet music...</p>
              )}
            </div>
            <div className="music-sheet-actions">
              <div className="music-sheet-author">
                <p>
                  <a href={`/profile/${username}`}>{username}</a>
                </p>
              </div>
              <div className="music-sheet-title">
                <h1>
                  {score?.title || "Loading title"} -{" "}
                  {score?.composer || "Loading composer"}
                </h1>
              </div>
              <div className="music-sheet-description">
                <p>{score?.description || "Loading description..."}</p>
              </div>
              <div className="music-sheet-controls">
                <div className="button-group">
                  <Button variant={"solid"} className="btn-download">
                    <Download className="icon" />
                    Download
                  </Button>
                  <Button variant={"solid"} className="btn-print">
                    <Printer className="icon" />
                    Print
                  </Button>
                </div>
                <div className="button-group">
                  {isFavorited ? (
                    <Button
                      variant={"solid"}
                      className="btn-favorite"
                      onClick={handleUnfavoriteSubmit}
                    >
                      <HeartOff className="icon" />
                      Unfavorite
                    </Button>
                  ) : (
                    <Button
                      variant={"solid"}
                      className="btn-favorite"
                      onClick={handleFavoriteSubmit}
                    >
                      <Heart className="icon" />
                      Favorite
                    </Button>
                  )}
                  <Button variant={"solid"} className="btn-share">
                    <Share2 className="icon" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
