import { createListCollection, Portal, Select } from "@chakra-ui/react";

export const SelectOrder = () => {
  const orderItems = createListCollection({
    items: [
      { label: "Rating", value: "rating" },
      { label: "Upload date", value: "upload-date" },
    ],
  });

  return (
    <Select.Root size="lg" collection={orderItems}>
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
            {orderItems.items.map((orderItem) => (
              <Select.Item item={orderItem} key={orderItem.value}>
                {orderItem.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
