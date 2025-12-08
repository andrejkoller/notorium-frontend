import { Button, RadioCard, SimpleGrid, Text } from "@chakra-ui/react";
import { toaster, Toaster } from "../../ui/toaster";
import type { Instrument } from "../../../models/sheet-music";
import { useCurrentUserContext } from "../../../contexts/user-context";
import { useSheetMusicContext } from "../../../contexts/sheet-music-context";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../services/user-service";
import { Link } from "react-router-dom";
import { filterSheetMusicByInstrument } from "../../../services/sheet-music-service";

export default function InstrumentDialog() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const { setSheetMusic } = useSheetMusicContext();
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(null);

  const instrumentOptions: Instrument[] = [
    "Piano",
    "Guitar",
    "Violin",
    "Flute",
    "Trumpet",
    "Drums",
    "Saxophone",
    "Cello",
    "Clarinet",
    "Trombone",
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
    if (selectedInstrument) {
      filterSheetMusicByInstrument(selectedInstrument)
        .then((filteredSheetMusic) => {
          setSheetMusic(filteredSheetMusic);
          toaster.success({
            title: "Sheet music filtered",
            description: `Filtered sheet music by instrument: ${selectedInstrument}`,
          });
        })
        .catch((error) => {
          console.error("Error filtering sheet music:", error);
          toaster.error({
            title: "Error",
            description: "Failed to filter sheet music by instrument.",
          });
        });
    } else {
      toaster.warning({
        title: "No instrument selected",
        description: "Please select a instrument to filter sheet music.",
      });
      return;
    }
    setSelectedInstrument(null);
  };

  return (
    <>
      {!currentUser ? (
        <div className="instrument-container">
          <div className="instrument-content">
            <Text className="instrument-login-text">
              Please log in to filter sheet music.
            </Text>
            <Button variant={"solid"} className="instrument-login-button">
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="instrument-container">
          <div className="instrument-content">
            <div className="instrument-header">
              <h1 className="instrument-title">Filter by instruments</h1>
            </div>
            <form className="instrument-form" onSubmit={handleSubmit}>
              <RadioCard.Root
                className="instrument-radio-card"
                name="instrument"
                value={selectedInstrument || ""}
                onValueChange={(details) =>
                  setSelectedInstrument(
                    (details as { value: string }).value as Instrument
                  )
                }
              >
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  {instrumentOptions.map((instrumentItem) => (
                    <RadioCard.Item key={instrumentItem} value={instrumentItem}>
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText>
                          {instrumentItem}
                        </RadioCard.ItemText>
                        <RadioCard.ItemIndicator />
                      </RadioCard.ItemControl>
                    </RadioCard.Item>
                  ))}
                </SimpleGrid>
              </RadioCard.Root>
              <Button
                variant={"solid"}
                className="instrument-submit-button"
                type="submit"
                disabled={!selectedInstrument}
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
