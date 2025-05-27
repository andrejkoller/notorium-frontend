import { Button, Card, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCurrentUser, updateUser } from "../services/UserService";
import type { User } from "../models/User";
import { Toaster, toaster } from "./ui/toaster";

export default function MyProfile() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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
        setCurrentUser((prevUser) =>
          prevUser ? { ...prevUser, ...userUpdateDto } : prevUser
        );
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        setFormData({
          name: user.name || "",
          email: user.email || "",
          username: user.username || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {loading ? (
        <VStack colorPalette="teal">
          <Spinner color="colorPalette.600" />
          <Text>Loading...</Text>
        </VStack>
      ) : (
        <Card.Root className="my-profile-card">
          <Card.Header className="my-profile-header">
            <h1 className="my-profile-title">My Profile</h1>
          </Card.Header>
          <Card.Body className="my-profile-body">
            <form onSubmit={handleSubmit} className="my-profile-form">
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
              <Button type="submit" disabled={!isFormValid}>
                Update Profile
              </Button>
            </form>
          </Card.Body>
        </Card.Root>
      )}
      <Toaster />
    </>
  );
}
