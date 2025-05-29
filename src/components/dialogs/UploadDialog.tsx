import {
  Box,
  Button,
  createListCollection,
  FileUpload,
  HStack,
  Icon,
  Input,
  RadioGroup,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";
import {
  getAllSheetMusic,
  uploadSheetMusic,
} from "../../services/SheetMusicService";
import { Toaster, toaster } from "../ui/toaster";
import { getCurrentUser } from "../../services/UserService";
import type { Difficulty, Genre, Instrument } from "../../models/SheetMusic";
import { useCurrentUserContext } from "../../contexts/UserContext";
import { useSheetMusicContext } from "../../contexts/SheetMusicContext";
import { Link } from "react-router-dom";

export default function UploadDialog() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const { setSheetMusic } = useSheetMusicContext();

  const [formData, setFormData] = useState({
    title: "",
    composer: "",
    genre: "",
    instrument: "",
    difficulty: "",
    description: "",
    isPublic: true,
    userId: currentUser?.id,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const isFormValid =
    formData.title.trim() !== "" &&
    formData.composer.trim() !== "" &&
    formData.genre.trim() !== "" &&
    formData.instrument.trim() !== "" &&
    formData.difficulty.trim() !== "" &&
    formData.description.trim() !== "" &&
    file !== null;

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

  const difficultyOptions: Difficulty[] = [
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const visibilityItems = [
    { label: "Public", value: true },
    { label: "Private", value: false },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      description: e.target.value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      isPublic: value === "true",
    }));
  };

  const handleFileChange = (files: File[]) => {
    setFile(files.length > 0 ? files[0] : null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isFormValid || !file) {
      toaster.error({
        title: "Invalid form",
        description: "Please fill in all required fields and select a file.",
        duration: 5000,
      });
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("composer", formData.composer);
      data.append("genre", formData.genre);
      data.append("instrument", formData.instrument);
      data.append("difficulty", formData.difficulty);
      data.append("description", formData.description);
      data.append("isPublic", String(formData.isPublic));
      data.append("userId", String(formData.userId || 0));
      data.append("file", file);
      data.append("fileName", file.name);

      await uploadSheetMusic(data);

      const updatedSheetMusic = await getAllSheetMusic();
      setSheetMusic(updatedSheetMusic);

      setLoading(false);
      setFormData({
        title: "",
        composer: "",
        genre: "",
        instrument: "",
        difficulty: "",
        description: "",
        isPublic: true,
        userId: currentUser?.id || 0,
      });
      setFile(null);
      toaster.success({
        title: "Upload successful",
        description: "Your sheet music has been uploaded successfully.",
        duration: 5000,
      });
    } catch (error) {
      setLoading(false);
      console.error("Error uploading sheet music:", error);
      toaster.error({
        title: "Upload failed",
        description: "There was an error uploading your sheet music.",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setCurrentUser(currentUser);
        setFormData((prevData) => ({
          ...prevData,
          userId: currentUser.id,
        }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [setCurrentUser]);

  return (
    <>
      {!currentUser ? (
        <div className="upload-container">
          <div className="upload-content">
            <Text className="upload-login-text">
              Please log in to upload sheet music.
            </Text>
            <Button variant={"solid"} className="upload-login-button">
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      ) : loading ? (
        <Text>Uploading your sheet music...</Text>
      ) : (
        <div className="upload-container">
          <div className="upload-content">
            <div className="upload-header">
              <h1 className="upload-title">Upload Sheet Music</h1>
            </div>
            <div className="upload-body">
              <form onSubmit={handleUpload} className="upload-form">
                <Input
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="upload-input"
                />
                <Input
                  name="composer"
                  placeholder="Composer"
                  value={formData.composer}
                  onChange={handleInputChange}
                  required
                  className="upload-input"
                />

                {/* Genre Select */}
                <Select.Root
                  size={"lg"}
                  value={formData.genre ? [formData.genre] : []}
                  onValueChange={(e) =>
                    handleSelectChange(
                      "genre",
                      (e as { items: { value: string }[] }).items[0].value
                    )
                  }
                  collection={createListCollection({
                    items: genreOptions.map((genre) => ({
                      label: genre,
                      value: genre,
                    })),
                  })}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Genre" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content>
                      {genreOptions.map((genre) => (
                        <Select.Item
                          item={{ label: genre, value: genre }}
                          key={genre}
                        >
                          {genre}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>

                {/* Instrument Select */}
                <Select.Root
                  size={"lg"}
                  value={formData.instrument ? [formData.instrument] : []}
                  onValueChange={(e) =>
                    handleSelectChange(
                      "instrument",
                      (e as { items: { value: string }[] }).items[0].value
                    )
                  }
                  collection={createListCollection({
                    items: instrumentOptions.map((instrument) => ({
                      label: instrument,
                      value: instrument,
                    })),
                  })}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Instruments" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content>
                      {instrumentOptions.map((instrument) => (
                        <Select.Item
                          item={{ label: instrument, value: instrument }}
                          key={instrument}
                        >
                          {instrument}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>

                {/* Difficulty Select */}
                <Select.Root
                  size={"lg"}
                  value={formData.difficulty ? [formData.difficulty] : []}
                  onValueChange={(e) =>
                    handleSelectChange(
                      "difficulty",
                      (e as { items: { value: string }[] }).items[0].value
                    )
                  }
                  collection={createListCollection({
                    items: difficultyOptions.map((difficulty) => ({
                      label: difficulty,
                      value: difficulty,
                    })),
                  })}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Difficulty" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content>
                      {difficultyOptions.map((difficulty) => (
                        <Select.Item
                          item={{ label: difficulty, value: difficulty }}
                          key={difficulty}
                        >
                          {difficulty}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>

                {/* Description Textarea */}
                <Textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleTextareaChange}
                  required
                  className="upload-textarea"
                />

                {/* Visibility Radio Group */}
                <RadioGroup.Root
                  size="lg"
                  defaultValue="true"
                  value={formData.isPublic ? "true" : "false"}
                  onValueChange={(e) => handleRadioChange(e.value ?? "true")}
                >
                  <HStack gap="6">
                    {visibilityItems.map((visibilityItem) => (
                      <RadioGroup.Item
                        key={visibilityItem.label}
                        value={visibilityItem.value.toString()}
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

                {/* File Upload */}
                <FileUpload.Root
                  maxW="xl"
                  alignItems="stretch"
                  maxFiles={1}
                  onFileChange={(details) => {
                    handleFileChange(details.acceptedFiles);
                  }}
                >
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
                <Button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="upload-button"
                >
                  Upload
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
