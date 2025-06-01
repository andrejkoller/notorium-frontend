import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../../contexts/UserContext";
import { getCurrentUser } from "../../services/UserService";
import { Link } from "react-router-dom";
import { Button, RadioCard, SimpleGrid, Text } from "@chakra-ui/react";
import type { Genre } from "../../models/SheetMusic";
import { useSheetMusicContext } from "../../contexts/SheetMusicContext";
import { filterSheetMusicByGenre } from "../../services/SheetMusicService";
import { Toaster, toaster } from "../ui/toaster";

export default function GenreDialog() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const { setSheetMusic } = useSheetMusicContext();
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const genreOptions: Genre[] = [
    "Classical",
    "Jazz",
    "Rock",
    "Pop",
    "Blues",
    "Folk",
    "Country",
    "Electronic",
    "Reggae",
    "Metal",
    "Soundtrack",
    "ModernClassical",
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser({
          ...user,
          name: user.name,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [setCurrentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGenre) {
      filterSheetMusicByGenre(selectedGenre)
        .then((filteredSheetMusic) => {
          setSheetMusic(filteredSheetMusic);
          toaster.success({
            title: "Sheet music filtered",
            description: `Filtered sheet music by genre: ${selectedGenre}`,
          });
        })
        .catch((error) => {
          console.error("Error filtering sheet music:", error);
          toaster.error({
            title: "Error",
            description: "Failed to filter sheet music by genre.",
          });
        });
    } else {
      toaster.warning({
        title: "No genre selected",
        description: "Please select a genre to filter sheet music.",
      });
      return;
    }
    setSelectedGenre(null);
  };

  return (
    <>
      {!currentUser ? (
        <div className="genre-container">
          <div className="genre-content">
            <Text className="genre-login-text">
              Please log in to filter sheet music.
            </Text>
            <Button variant={"solid"} className="genre-login-button">
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="genre-container">
          <div className="genre-content">
            <div className="genre-header">
              <h1 className="genre-title">Filter sheet music by genre</h1>
            </div>
            <form className="genre-form" onSubmit={handleSubmit}>
              <RadioCard.Root
                className="genre-radio-card"
                name="genre"
                value={selectedGenre || ""}
                onValueChange={(details) =>
                  setSelectedGenre(
                    (details as { value: string }).value as Genre
                  )
                }
              >
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  {genreOptions.map((genreItem) => (
                    <RadioCard.Item key={genreItem} value={genreItem}>
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText>{genreItem}</RadioCard.ItemText>
                        <RadioCard.ItemIndicator />
                      </RadioCard.ItemControl>
                    </RadioCard.Item>
                  ))}
                </SimpleGrid>
              </RadioCard.Root>
              <Button
                variant={"solid"}
                className="genre-submit-button"
                type="submit"
                disabled={!selectedGenre}
              >
                Save changes
              </Button>
            </form>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
