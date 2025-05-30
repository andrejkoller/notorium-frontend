import { Button, RadioCard, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { toaster, Toaster } from "../ui/toaster";
import { useCurrentUserContext } from "../../contexts/UserContext";
import { useSheetMusicContext } from "../../contexts/SheetMusicContext";
import type { Difficulty } from "../../models/SheetMusic";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/UserService";
import { Link } from "react-router-dom";
import { filterSheetMusicByDifficulty } from "../../services/SheetMusicService";

export default function DifficultyDialog() {
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
            description: `Filtered sheet music by genre: ${selectedDifficulty}`,
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
        title: "No genre selected",
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
                <Wrap>
                  {difficultyOptions.map((difficultyItem) => (
                    <WrapItem key={difficultyItem}>
                      <RadioCard.Item value={difficultyItem}>
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl>
                          <RadioCard.ItemText>
                            {difficultyItem}
                          </RadioCard.ItemText>
                          <RadioCard.ItemIndicator />
                        </RadioCard.ItemControl>
                      </RadioCard.Item>
                    </WrapItem>
                  ))}
                </Wrap>
              </RadioCard.Root>
              <Button
                variant={"solid"}
                className="genre-submit-button"
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
