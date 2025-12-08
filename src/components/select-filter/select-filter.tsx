import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useSheetMusicContext } from "../../contexts/sheet-music-context";
import { filterSheetMusicByUploadDate } from "../../services/sheet-music-service";
import { Toaster, toaster } from "../ui/toaster";

export const SelectFilter = () => {
  const { setSheetMusic } = useSheetMusicContext();
  const [descending, setDescending] = useState(false);

  const sheetMusicCollectionFilter = createListCollection({
    items: [
      { label: "Newest first", value: false },
      { label: "Oldest first", value: true },
    ],
  });

  const handleValueChange = (e: unknown) => {
    const value = (e as { items: { value: boolean }[] }).items[0].value;
    if (value === descending) return;
    setDescending(value);
    filterSheetMusicByUploadDate(descending)
      .then((music) => {
        setSheetMusic(music);
        toaster.success({
          title: "Sheet music filtered",
          description: `Sheet music has been sorted by upload date in ${
            descending ? "descending" : "ascending"
          } order.`,
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error("Error filtering sheet music by upload date:", error);
        toaster.error({
          title: "Error",
          description: "Failed to filter sheet music by upload date.",
          duration: 3000,
        });
      });
  };

  return (
    <>
      <Select.Root
        collection={sheetMusicCollectionFilter}
        size="lg"
        variant="outline"
        width={"200px"}
        onValueChange={handleValueChange}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Sort music sheet" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {sheetMusicCollectionFilter.items.map((sheetMusic) => (
                <Select.Item
                  item={sheetMusic}
                  key={sheetMusic.value.toString()}
                  aria-disabled={descending === sheetMusic.value}
                  style={{
                    opacity: descending === sheetMusic.value ? 0.5 : 1,
                    pointerEvents:
                      descending === sheetMusic.value ? "none" : "auto",
                  }}
                >
                  {sheetMusic.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <Toaster />
    </>
  );
};
