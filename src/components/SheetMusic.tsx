import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { SheetMusic } from "../models/SheetMusic";
import {
  addSheetMusicToFavorites,
  deleteSheetMusic,
  getSheetMusicById,
  removeSheetMusicFromFavorites,
} from "../services/SheetMusicService";
import { Download, Heart, HeartOff, Printer, Trash2 } from "lucide-react";
import { Toaster, toaster } from "./ui/toaster";
import { useCurrentUserContext } from "../contexts/UserContext";

export default function MusicSheet() {
  const navigate = useNavigate();

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

  const handleRemoveSubmit = () => {
    if (score) {
      deleteSheetMusic(Number(scoreId))
        .then(() => {
          toaster.success({
            title: "Deleted",
            description: `${score.title} has been deleted successfully.`,
          });
          setScore(null);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting sheet music:", error);
          toaster.error({
            title: "Error",
            description: "Failed to delete sheet music.",
          });
        });
    } else {
      console.error("No sheet music available to delete.");
    }
  };

  useEffect(() => {
    if (scoreId) {
      getSheetMusicById(Number(scoreId))
        .then((data) => {
          setScore(data);
        })
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
                <iframe
                  src={`https://localhost:7189/${score.filePath}`}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  title="Sheet Music PDF"
                />
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
                  {currentUser?.id === score?.user?.id && (
                    <Button
                      variant={"solid"}
                      className="btn-delete"
                      onClick={handleRemoveSubmit}
                    >
                      <Trash2 className="icon" />
                      Delete
                    </Button>
                  )}
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
