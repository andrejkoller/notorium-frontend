import { useEffect, useState, useRef } from "react";
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
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfjs } from "react-pdf";
import "./sheet-music.css";
import { useCurrentUserContext } from "../../hooks/use-current-user";
import { Button } from "@chakra-ui/react";
import {
  EllipsisVerticalIcon,
  Heart,
  HeartOff,
  Download,
  Printer,
  Trash2,
} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function MusicSheet() {
  const navigate = useNavigate();
  const [score, setScore] = useState<SheetMusic | null>(null);
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const [numPages, setNumPages] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pdfUrl = score ? `https://localhost:7189/${score.filePath}` : "";

  const isFavorited = currentUser?.favoriteSheetMusic?.some(
    (s) => s.id === score?.id
  );

  const { scoreId } = useParams<{
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
        })
        .catch((error) => {
          console.error("Error adding sheet music to favorites:", error);
        });
    } catch (error) {
      console.error("Error preparing sheet music for favoriting:", error);
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
        })
        .catch((error) => {
          console.error("Error removing sheet music from favorites:", error);
        });
    } catch (error) {
      console.error("Error preparing sheet music for unfavoriting:", error);
    }
  };

  const handleRemoveSubmit = () => {
    if (!score) return;
    try {
      deleteSheetMusic(Number(scoreId))
        .then(() => {
          setScore(null);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting sheet music:", error);
        });
    } catch (error) {
      console.error("Error preparing sheet music for deletion:", error);
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
        })
        .catch((error) => {
          console.error("Error downloading sheet music:", error);
        });
    } catch (error) {
      console.error("Error preparing sheet music for download:", error);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sheet-music-container">
      <div className="sheet-music-content">
        <div className="sheet-music-body">
          <div className="sheet-music">
            {score ? (
              <Document
                file={pdfUrl}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                onLoadError={(error) =>
                  console.error("Error loading PDF document:", error)
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
        </div>
      </div>
      <div className="button-container" ref={menuRef}>
        <Button
          variant={"solid"}
          className="options-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <EllipsisVerticalIcon size={16} />
        </Button>
        {isMenuOpen && (
          <div className="dropdown-menu">
            {isFavorited ? (
              <Button
                variant={"solid"}
                className="menu-item"
                onClick={handleUnfavoriteSubmit}
              >
                <HeartOff size={16} />
              </Button>
            ) : (
              <Button
                variant={"solid"}
                className="menu-item"
                onClick={handleFavoriteSubmit}
              >
                <Heart size={16} />
              </Button>
            )}
            <Button
              variant={"solid"}
              className="menu-item"
              onClick={handleDownload}
            >
              <Download size={16} />
            </Button>
            <Button
              variant={"solid"}
              className="menu-item"
              onClick={handlePrint}
            >
              <Printer size={16} />
            </Button>
            {currentUser?.id === score?.user?.id && (
              <Button
                variant={"solid"}
                className="menu-item delete"
                onClick={handleRemoveSubmit}
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicSheet;
