import { Button, Image } from "@chakra-ui/react";
import "./home.css";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllSheetMusic } from "../../services/sheet-music-service";
import type { SheetMusic } from "../../models/sheet-music";

function Home() {
  const [trendingSheets, setTrendingSheets] = useState<SheetMusic[]>([]);

  useEffect(() => {
    const fetchTrendingSheets = async () => {
      try {
        const sheets = await getAllSheetMusic();
        if (sheets) {
          const sorted = [...sheets]
            .sort((a, b) => b.favorites - a.favorites)
            .slice(0, 5);
          setTrendingSheets(sorted);
        }
      } catch (error) {
        console.error("Error fetching trending sheets:", error);
      }
    };

    fetchTrendingSheets();
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="h-title-button-container">
          <div className="h-title-container">
            <p className="h-subtitle">Create. Share. Inspire.</p>
            <h1 className="h-title">
              Find the perfect sheet music for your next performance.
            </h1>
            <p className="h-description">
              Discover, create, and share sheet music with a vibrant community
              of musicians. Whether you're a composer, performer, or music
              enthusiast, Notorium offers the perfect tools to bring your
              musical ideas to life.
            </p>
          </div>
          <div className="h-button-container">
            <Link to="/register">
              <Button variant={"solid"} className="h-button-get-started">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="t-sheet-container">
          <h1 className="t-sheet-title">Trending Sheets</h1>
          <Link to="/scores" className="t-sheet-action">
            <span className="t-sheet-action-highlight">View more</span>
            <ChevronRightIcon size={16} />
          </Link>
        </div>
        <div className="t-sheet-list">
          {trendingSheets.map((sheet) => (
            <div key={sheet.id} className="t-sheet-item">
              <Link to={`/user/${sheet.user?.username}/scores/${sheet.id}`}>
                <div className="t-sheet-image">
                  <Image
                    src={`${`https://localhost:7189`}/${sheet.previewImage}`}
                    alt={`Preview of ${sheet.title} sheet music`}
                  />
                </div>
              </Link>
              <div className="t-sheet-info">
                <h3 className="t-sheet-item-title">{sheet.title}</h3>
                <p className="t-sheet-composer">{sheet.composer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
