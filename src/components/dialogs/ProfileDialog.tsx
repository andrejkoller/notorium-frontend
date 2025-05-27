import { Button, Card, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Toaster, toaster } from "../ui/toaster";
import { updateUser } from "../../services/UserService";
import type { User } from "../../models/User";

type ProfileDialogProps = {
  currentUser: {
    id: number;
    name: string;
    email: string;
    username: string;
  } | null;
  setCurrentUser: (user: User) => void;
};

export default function ProfileDialog({
  currentUser,
  setCurrentUser,
}: ProfileDialogProps) {
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    username: currentUser?.username || "",
  });
  const [loading, setLoading] = useState(false);

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.username.trim() !== "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isFormValid) {
      setLoading(false);
      return;
    }

    try {
      if (
        currentUser ||
        (formData.name !== "" &&
          formData.email !== "" &&
          formData.username !== "")
      ) {
        if (!currentUser) {
          setLoading(false);
          toaster.error({
            title: "Update failed",
            description: "User information is missing.",
            duration: 5000,
          });
          return;
        }
        const userUpdateDto = {
          name: formData.name,
          email: formData.email,
          username: formData.username,
        };
        await updateUser(currentUser.id, userUpdateDto);
        setCurrentUser({
          ...currentUser,
          ...userUpdateDto,
          password: "",
          role: "User",
          token: "",
        });
        toaster.success({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
          duration: 2000,
        });
        setFormData({
          name: userUpdateDto.name,
          email: userUpdateDto.email,
          username: userUpdateDto.username,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toaster.error({
          title: "Update failed",
          description: error.message,
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
          <Text>Loading...</Text>
        </VStack>
      ) : (
        <>
          <Card.Root className="profile-dialog-card">
            <form onSubmit={handleSubmit} className="profile-dialog-form">
              <Card.Header className="profile-dialog-header">
                <h1 className="profile-dialog-title">Edit Profile</h1>
              </Card.Header>
              <Card.Body className="profile-dialog-body">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </Card.Body>
              <Card.Footer className="profile-dialog-footer">
                <Button type="submit" disabled={!isFormValid}>
                  Update Profile
                </Button>
              </Card.Footer>
            </form>
          </Card.Root>
        </>
      )}
      <Toaster />
    </>
  );
}
