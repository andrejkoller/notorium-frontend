import { InputGroup, Input } from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
import { useCurrentUserContext } from "../../hooks/use-current-user";
import { useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";
import { searchSheetMusic } from "../../services/sheet-music-service";
import "./searchbar.css";

function SearchBar() {
  const { currentUser } = useCurrentUserContext();
  const navigate = useNavigate();

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
    <div className="searchbar-container">
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
  );
}

export default SearchBar;
