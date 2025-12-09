import { Link, useSearchParams } from "react-router-dom";
import { useSheetMusicContext } from "../../hooks/use-sheet-music";
import SelectFilter from "../select-filter/select-filter";
import "./search-results.css";

function SearchResults() {
  const { sheetMusic } = useSheetMusicContext();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  function formatGenre(genre: string) {
    return genre.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  return (
    <div className="search-results-container">
      <div className="search-results-content">
        <div className="search-results-header">
          <h1>Search Results</h1>
          <div className="search-results-filters">
            <SelectFilter />
          </div>
        </div>
        <div className="search-results-body">
          {sheetMusic && sheetMusic.length > 0 ? (
            <ul className="search-results-list">
              {sheetMusic
                .filter(
                  (music) =>
                    music.title
                      .toLowerCase()
                      .includes(query?.toLowerCase() || "") ||
                    music.composer
                      .toLowerCase()
                      .includes(query?.toLowerCase() || "") ||
                    music.user?.name
                      .toLowerCase()
                      .includes(query?.toLowerCase() || "")
                )
                .map(
                  (music) =>
                    music.isPublic && (
                      <li key={music.id} className="search-results-item">
                        <Link
                          to={`/user/${music.user?.username}/scores/${music.id}`}
                          className="search-results-link"
                        >
                          <img
                            src={`https://localhost:7189/${music.previewImage}`}
                            alt={music.title}
                            className="search-results-image"
                          />
                        </Link>
                        <Link
                          to={`/user/${music.user?.username}/scores/${music.id}`}
                          className="search-results-title"
                        >
                          <h2 className="search-results-title">
                            {music.title}
                          </h2>
                        </Link>
                        <p className="search-results-composer">
                          {music.composer}
                        </p>
                        <div className="search-results-genre-instrument">
                          <p className="search-results-instrument">
                            {music.instrument}
                          </p>
                          <span>-</span>
                          <p className="search-results-genre">
                            {formatGenre(music.genre)}
                          </p>
                        </div>
                        <p className="search-results-user">
                          Uploaded by {music.user?.name || "Unknown"}
                        </p>
                        <p className="search-results-upload-date">
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
            <p>No results found for "{query}"</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
