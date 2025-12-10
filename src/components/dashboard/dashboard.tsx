import { useEffect } from "react";
import {
  getAllSheetMusic,
  searchSheetMusic,
} from "../../services/sheet-music-service";
import { Link } from "react-router-dom";
import { useSheetMusicContext } from "../../hooks/use-sheet-music";
import "./dashboard.css";
import DashboardHeader from "./dashboard-header/dashboard-header";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Button, Input, InputGroup } from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import { useCurrentUserContext } from "../../hooks/use-current-user";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { sheetMusic, setSheetMusic } = useSheetMusicContext();
  const { currentUser } = useCurrentUserContext();
  const navigate = useNavigate();

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

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      toaster.error({
        title: "Search Error",
        description: "Please enter a search term.",
      });
      return;
    }

    searchSheetMusic(query)
      .then((results) => {
        if (results.length > 0) {
          navigate(`/search?query=${encodeURIComponent(query)}`);
        } else {
          toaster.info({
            title: "No Results",
            description: "No sheet music found for your search.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching sheet music:", error);
        toaster.error({
          title: "Search Error",
          description: "An error occurred while searching for sheet music.",
        });
      });
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Library</h1>
          <div className="dashboard-wrapper">
            <div className="dashboard-searchbar">
              <InputGroup flex={1} startElement={<SearchIcon size={20} />}>
                <Input
                  placeholder="Search library"
                  disabled={!currentUser}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e.currentTarget.value);
                    }
                  }}
                />
              </InputGroup>
            </div>
            <div className="dashboard-button-container">
              <Link to="/dashboard/upload" className="dashboard-upload-button">
                <Button variant={"solid"}>
                  <PlusIcon size={16} />
                  <span className="dashboard-button-text">Upload music</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="dashboard-body">
          {sheetMusic && sheetMusic.length > 0 ? (
            <ul className="sheet-music-list">
              {sheetMusic.map(
                (music) =>
                  music.isPublic && (
                    <li key={music.id} className="sheet-music-item">
                      <Link
                        to={`/dashboard/user/${music.user?.username}/scores/${music.id}`}
                        className="sheet-music-link"
                      >
                        <img
                          src={`https://localhost:7189/${music.previewImage}`}
                          alt={music.title}
                          className="sheet-music-image"
                        />
                      </Link>
                      <Link
                        to={`/dashboard/user/${music.user?.username}/scores/${music.id}`}
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

export default Dashboard;
