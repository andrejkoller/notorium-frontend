import { Button, Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { SheetMusic } from "../models/SheetMusic";
import { getSheetMusicById } from "../services/SheetMusicService";
import { SelectFilter } from "./SelectFilter";
import { Download, Heart, Printer, Share2 } from "lucide-react";

export default function MusicSheet() {
  const [score, setScore] = useState<SheetMusic | null>(null);

  const { username, scoreId } = useParams<{
    username: string;
    scoreId: string;
  }>();

  useEffect(() => {
    if (scoreId) {
      getSheetMusicById(Number(scoreId))
        .then((data) => setScore(data))
        .catch((error) => {
          console.error("Error fetching sheet music:", error);
          setScore(null);
        });
    }
  });

  return (
    <Card.Root className="music-sheet-card">
      <Card.Body className="music-sheet-body">
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
          <div className="music-sheet-category-selector">
            <div className="instrument-selector">
              <SelectFilter />
            </div>
            <div className="difficulty-selector">
              <SelectFilter />
            </div>
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
              <Button variant={"solid"} className="btn-favorite">
                <Heart className="icon" />
                Favorite
              </Button>
              <Button variant={"solid"} className="btn-share">
                <Share2 className="icon" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card.Root>
  );
}
