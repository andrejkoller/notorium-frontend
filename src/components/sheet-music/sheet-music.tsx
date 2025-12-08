import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { SheetMusic } from "../../models/sheet-music";
import {
  addSheetMusicToFavorites,
  deleteSheetMusic,
  downloadSheetMusic,
  getSheetMusicById,
  printSheetMusic,
  removeSheetMusicFromFavorites,
} from "../../services/sheet-music-service";
import {
  ArrowDownToLine,
  Download,
  Eye,
  Heart,
  HeartOff,
  Printer,
  Trash2,
} from "lucide-react";
import { Toaster, toaster } from "../ui/toaster";
import { useCurrentUserContext } from "../../hooks/use-current-user";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function MusicSheet() {
  const navigate = useNavigate();
  const [score, setScore] = useState<SheetMusic | null>(null);
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const [numPages, setNumPages] = useState<number>(0);
  const pdfUrl = score ? `https://localhost:7189/${score.filePath}` : "";

  const isFavorited = currentUser?.favoriteSheetMusic?.some(
    (s) => s.id === score?.id
  );

  const { username, scoreId } = useParams<{
    username: string;
    scoreId: string;
  }>();

  const handleFavoriteSubmit = () => {
    if (!score) return;
    try {
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
    } catch (error) {
      console.error("Error preparing sheet music for favoriting:", error);
      toaster.error({
        title: "Favorite Error",
        description: "Failed to prepare sheet music for favoriting.",
      });
    }
  };

  const handleUnfavoriteSubmit = () => {
    if (!score) return;
    try {
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
    } catch (error) {
      console.error("Error preparing sheet music for unfavoriting:", error);
      toaster.error({
        title: "Unfavorite Error",
        description: "Failed to prepare sheet music for unfavoriting.",
      });
    }
  };

  const handleRemoveSubmit = () => {
    if (!score) return;
    try {
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
    } catch (error) {
      console.error("Error preparing sheet music for deletion:", error);
      toaster.error({
        title: "Delete Error",
        description: "Failed to prepare sheet music for deletion.",
      });
    }
  };

  const handleDownload = () => {
    if (!score) return;
    try {
      downloadSheetMusic(score.id)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", score.fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
          toaster.success({
            title: "Download Successful",
            description: `${score.title} has been downloaded.`,
          });
        })
        .catch((error) => {
          console.error("Error downloading sheet music:", error);
          toaster.error({
            title: "Download Error",
            description: "Failed to download sheet music.",
          });
        });
    } catch (error) {
      console.error("Error preparing sheet music for download:", error);
      toaster.error({
        title: "Download Error",
        description: "Failed to prepare sheet music for download.",
      });
    }
  };

  const handlePrint = async () => {
    if (!score) return;
    try {
      const blob = await printSheetMusic(score.id);
      const url = window.URL.createObjectURL(blob);

      const printWindow = document.createElement("iframe");
      printWindow.style.display = "none";
      printWindow.src = url;
      document.body.appendChild(printWindow);
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.contentWindow?.focus();
          printWindow.contentWindow?.print();
        };
        const interval = setInterval(() => {
          if (printWindow.contentWindow?.closed) {
            document.body.removeChild(printWindow);
            window.URL.revokeObjectURL(url);
            clearInterval(interval);
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error preparing sheet music for printing:", error);
      toaster.error({
        title: "Print Error",
        description: "Failed to prepare sheet music for printing.",
      });
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
      <div className="sheet-music-container">
        <div className="sheet-music-content">
          <div className="sheet-music-body">
            <div className="sheet-music">
              {score ? (
                <Document
                  file={pdfUrl}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  onLoadError={(error) =>
                    toaster.error({
                      title: "PDF Load Error",
                      description: `Failed to load PDF: ${error.message}`,
                    })
                  }
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <Page key={i + 1} pageNumber={i + 1} width={800} />
                  ))}
                </Document>
              ) : (
                <p>Loading sheet music...</p>
              )}
            </div>
            <div className="sheet-music-actions">
              <div className="sheet-music-wrapper">
                <div className="sheet-music-author">
                  <p>
                    <a href={`/profile/${username}`}>{username}</a>
                  </p>
                </div>
                <div className="sheet-music-title">
                  <h1>
                    {score?.title || "Loading title"} -{" "}
                    {score?.composer || "Loading composer"}
                  </h1>
                </div>
                <div className="sheet-music-description">
                  <p>{score?.description || "Loading description..."}</p>
                </div>
              </div>
              <div className="sheet-music-wrapper">
                <div className="sheet-music-stats">
                  <div className="views">
                    <Eye className="icon" />
                    <span>{score?.views || 0}</span>
                  </div>
                  <div className="downloads">
                    <ArrowDownToLine className="icon" />
                    <span>{score?.downloads || 0}</span>
                  </div>
                  <div className="favorites">
                    <Heart className="icon" />
                    <span>{score?.favorites || 0}</span>
                  </div>
                </div>
                <div className="sheet-music-controls">
                  <div className="button-group">
                    <Button
                      variant={"solid"}
                      className="btn-download"
                      onClick={handleDownload}
                    >
                      <Download className="icon" />
                      Download
                    </Button>
                    <Button
                      variant={"solid"}
                      className="btn-print"
                      onClick={handlePrint}
                    >
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
      </div>
      <Toaster />
    </>
  );
}

export default MusicSheet;
