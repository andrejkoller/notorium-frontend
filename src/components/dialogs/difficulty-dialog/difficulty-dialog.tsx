import { Button, RadioCard, SimpleGrid, Text } from "@chakra-ui/react";
import { toaster, Toaster } from "../../ui/toaster";
import { useCurrentUserContext } from "../../../hooks/use-current-user";
import { useSheetMusicContext } from "../../../hooks/use-sheet-music";
import type { Difficulty } from "../../../models/sheet-music";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../services/user-service";
import { Link } from "react-router-dom";
import { filterSheetMusicByDifficulty } from "../../../services/sheet-music-service";
import "./difficulty-dialog.css";

function DifficultyDialog() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const { setSheetMusic } = useSheetMusicContext();
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);

  const difficultyOptions: Difficulty[] = [
    "Beginner",
    "Intermediate",
    "Advanced",
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
    if (selectedDifficulty) {
      filterSheetMusicByDifficulty(selectedDifficulty)
        .then((filteredSheetMusic) => {
          setSheetMusic(filteredSheetMusic);
          toaster.success({
            title: "Sheet music filtered",
            description: `Filtered sheet music by difficulty: ${selectedDifficulty}`,
          });
        })
        .catch((error) => {
          console.error("Error filtering sheet music:", error);
          toaster.error({
            title: "Error",
            description: "Failed to filter sheet music by difficulty.",
          });
        });
    } else {
      toaster.warning({
        title: "No difficulty selected",
        description: "Please select a difficulty to filter sheet music.",
      });
      return;
    }
    setSelectedDifficulty(null);
  };

  return (
    <>
      {!currentUser ? (
        <div className="difficulty-container">
          <div className="difficulty-content">
            <Text className="difficulty-login-text">
              Please log in to filter sheet music.
            </Text>
            <Button variant={"solid"} className="difficulty-login-button">
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="difficulty-container">
          <div className="difficulty-content">
            <div className="difficulty-header">
              <h1 className="difficulty-title">
                Filter sheet music by difficulty
              </h1>
            </div>
            <form className="difficulty-form" onSubmit={handleSubmit}>
              <RadioCard.Root
                className="difficulty-radio-card"
                name="difficulty"
                value={selectedDifficulty || ""}
                onValueChange={(details) =>
                  setSelectedDifficulty(
                    (details as { value: string }).value as Difficulty
                  )
                }
              >
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  {difficultyOptions.map((difficultyItem) => (
                    <RadioCard.Item key={difficultyItem} value={difficultyItem}>
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText>
                          {difficultyItem}
                        </RadioCard.ItemText>
                        <RadioCard.ItemIndicator />
                      </RadioCard.ItemControl>
                    </RadioCard.Item>
                  ))}
                </SimpleGrid>
              </RadioCard.Root>
              <Button
                variant={"solid"}
                className="difficulty-submit-button"
                type="submit"
                disabled={!selectedDifficulty}
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

export default DifficultyDialog;
