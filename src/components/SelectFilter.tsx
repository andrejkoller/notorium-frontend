import { createListCollection, Portal, Select } from "@chakra-ui/react";

export const SelectFilter = () => {
  const sheetMusicCollectionFilter = createListCollection({
    items: [{ label: "Upload Date", value: "upload-date" }],
  });

  return (
    <Select.Root
      collection={sheetMusicCollectionFilter}
      size="lg"
      variant="outline"
      width={"200px"}
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
              <Select.Item item={sheetMusic} key={sheetMusic.value}>
                {sheetMusic.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
