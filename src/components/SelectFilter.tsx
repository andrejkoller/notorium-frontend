import { createListCollection, Portal, Select } from "@chakra-ui/react";

export const SelectFilter = () => {
  const filterItems = createListCollection({
    items: [
      { label: "Rating", value: "rating" },
      { label: "Upload date", value: "upload-date" },
    ],
  });

  return (
    <Select.Root size="lg" collection={filterItems}>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Rating" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {filterItems.items.map((filterItem) => (
              <Select.Item item={filterItem} key={filterItem.value}>
                {filterItem.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
