import {
  Box,
  Button,
  createListCollection,
  FileUpload,
  HStack,
  Icon,
  Input,
  Portal,
  RadioGroup,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { ComponentHeader } from "./ComponentHeader";

export default function Upload() {
  const genres = createListCollection({
    items: [
      { label: "Classical", value: "classical" },
      { label: "Jazz", value: "jazz" },
      { label: "Rock", value: "rock" },
      { label: "Pop", value: "pop" },
      { label: "Blues", value: "blues" },
      { label: "Folk", value: "folk" },
      { label: "Country", value: "country" },
      { label: "Electronic", value: "electronic" },
      { label: "Reggae", value: "reggae" },
      { label: "Metal", value: "metal" },
    ],
  });

  const instruments = createListCollection({
    items: [
      { label: "Piano", value: "piano" },
      { label: "Guitar", value: "guitar" },
      { label: "Violin", value: "violin" },
      { label: "Flute", value: "flute" },
      { label: "Trumpet", value: "trumpet" },
      { label: "Drums", value: "drums" },
      { label: "Saxophone", value: "saxophone" },
      { label: "Cello", value: "cello" },
      { label: "Harp", value: "harp" },
      { label: "Trombone", value: "trombone" },
    ],
  });

  const difficulties = createListCollection({
    items: [
      { label: "Beginner", value: "beginner" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Advanced", value: "advanced" },
    ],
  });

  const visibilityItems = [
    { label: "Public", value: "true" },
    { label: "Private", value: "false" },
  ];

  const handleUpload = () => {
    // Handle the upload logic here
  };

  return (
    <div className="upload-container">
      <ComponentHeader />
      <div className="upload-content">
        <form className="upload-form" onSubmit={handleUpload}>
          <div className="upload-instructions-title">
            <h2 className="upload-instructions-text">Upload your file</h2>
          </div>
          <div className="upload-title-container">
            <div className="upload-title-label">
              <label htmlFor="title" className="upload-title-label-text">
                Title
              </label>
            </div>
            <div className="upload-title-input-container">
              <Input
                placeholder="e. g. Moonlight Sonata"
                variant={"outline"}
                size={"lg"}
                type="text"
                id="title"
                name="title"
                required
                className="upload-title-input"
              />
            </div>
          </div>
          <div className="upload-composer-container">
            <div className="upload-composer-label">
              <label htmlFor="composer" className="upload-composer-label-text">
                Composer
              </label>
            </div>
            <div className="upload-composer-input-container">
              <Input
                placeholder="e. g. Ludwig van Beethoven"
                variant={"outline"}
                size={"lg"}
                type="text"
                id="composer"
                name="composer"
                required
                className="upload-composer-input"
              />
            </div>
          </div>
          <div className="upload-genre-container">
            <div className="upload-genre-label">
              <label htmlFor="genre" className="upload-genre-label-text">
                Genre
              </label>
            </div>
            <div className="upload-genre-input-container">
              <Select.Root size={"lg"} collection={genres}>
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="e. g. Classical" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {genres.items.map((genre) => (
                        <Select.Item item={genre} key={genre.value}>
                          {genre.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </div>
          </div>
          <div className="upload-instrument-container">
            <div className="upload-instrument-label">
              <label
                htmlFor="instrument"
                className="upload-instrument-label-text"
              >
                Instrument
              </label>
            </div>
            <div className="upload-instrument-input-container">
              <Select.Root size={"lg"} collection={instruments}>
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="e. g. Piano" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {instruments.items.map((instrument) => (
                        <Select.Item item={instrument} key={instrument.value}>
                          {instrument.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </div>
          </div>
          <div className="upload-difficulty-container">
            <div className="upload-difficulty-label">
              <label
                htmlFor="difficulty"
                className="upload-difficulty-label-text"
              >
                Difficulty
              </label>
            </div>
            <div className="upload-difficulty-input-container">
              <Select.Root size={"lg"} collection={difficulties}>
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="e. g. Intermediate" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {difficulties.items.map((difficulty) => (
                        <Select.Item item={difficulty} key={difficulty.value}>
                          {difficulty.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </div>
          </div>
          <div className="upload-description-container">
            <div className="upload-description-label">
              <label
                htmlFor="description"
                className="upload-description-label-text"
              >
                Description
              </label>
            </div>
            <div className="upload-description-input-container">
              <Textarea
                placeholder="e. g. A beautiful piece by Beethoven"
                variant={"outline"}
                size={"lg"}
                id="description"
                name="description"
                required
                className="upload-description-input"
              />
            </div>
          </div>
          <div className="upload-visibility-container">
            <div className="upload-visibility-label">
              <label
                htmlFor="visibility"
                className="upload-visibility-label-text"
              >
                Visibility
              </label>
            </div>
            <div className="upload-visibility-input-container">
              <RadioGroup.Root size="lg" defaultValue="true">
                <HStack gap="6">
                  {visibilityItems.map((visibilityItem) => (
                    <RadioGroup.Item
                      key={visibilityItem.value}
                      value={visibilityItem.value}
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>
                        {visibilityItem.label}
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </HStack>
              </RadioGroup.Root>
            </div>
          </div>
          <div className="upload-file-container">
            <div className="upload-file-input-container">
              <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={10}>
                <FileUpload.HiddenInput />
                <FileUpload.Dropzone>
                  <Icon size="md" color="fg.muted">
                    <LuUpload />
                  </Icon>
                  <FileUpload.DropzoneContent>
                    <Box>Drag and drop files here</Box>
                    <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List />
              </FileUpload.Root>
            </div>
          </div>
          <div className="button-container">
            <Button size={"lg"} variant={"solid"} disabled>
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
