import {
  Button,
  createListCollection,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { ThemeSwitcher } from "../theme-switcher/theme-switcher";
import { toaster } from "../ui/toaster";
import { useEffect, useState } from "react";
import { getCurrentUser, updateUser } from "../../services/user-service";
import { useCurrentUserContext } from "../../hooks/use-current-user";
import type { Role } from "../../models/user";
import "./settings.css";

function Settings() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    username: currentUser?.username || "",
    description: currentUser?.description || "No description provided.",
    role: currentUser?.role || "User",
  });
  const [loading, setLoading] = useState(false);

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.username.trim() !== "" &&
    formData.description.trim() !== "" &&
    formData.email.includes("@");

  const roleOptions: Role[] = ["User", "Admin"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      description: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
      if (currentUser && isFormValid) {
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
          description: formData.description,
          role: formData.role,
        };
        await updateUser(currentUser.id, userUpdateDto);
        setCurrentUser({
          ...currentUser,
          ...userUpdateDto,
          password: "",
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
          description: userUpdateDto.description || "",
          role: userUpdateDto.role || "User",
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
      setLoading(true);
      try {
        const user = await getCurrentUser();
        setCurrentUser({
          ...user,
          name: user.name,
          description: user.description || "No description provided.",
        });
        setFormData({
          name: user.name,
          email: user.email,
          username: user.username,
          description: user.description || "No description provided.",
          role: user.role || "User",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setCurrentUser]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="settings-container">
          <div className="settings-content">
            <div className="settings-header">
              <h1>Settings</h1>
            </div>
            <div className="settings-body">
              <form className="settings-form" onSubmit={handleSubmit}>
                <div className="settings-field">
                  <div className="settings-info">
                    <label htmlFor="theme">Theme</label>
                    <p className="settings-description">
                      Choose your preferred theme for the application.
                    </p>
                  </div>
                  <div className="settings-select">
                    <ThemeSwitcher />
                  </div>
                </div>
                <div className="settings-field">
                  <div className="settings-info">
                    <label>Edit Profile</label>
                    <p className="settings-description">
                      Update your profile information.
                    </p>
                  </div>
                </div>
                <div className="settings-form-group">
                  <div className="input-name-group">
                    {/* Name Input */}
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />

                    {/* Username Input */}
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  {/* Description Textarea */}
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleTextareaChange}
                    rows={4}
                  />
                  {/* Role Select */}
                  <Select.Root
                    size={"lg"}
                    value={formData.role ? [formData.role] : []}
                    onValueChange={(e) =>
                      handleSelectChange(
                        "role",
                        (e as { items: { value: string }[] }).items[0].value
                      )
                    }
                    collection={createListCollection({
                      items: roleOptions.map((role) => ({
                        label: role,
                        value: role,
                      })),
                    })}
                    disabled={!currentUser || currentUser.role !== "Admin"}
                    className="settings-role-select"
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder={currentUser?.role} />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content>
                        {roleOptions.map((role) => (
                          <Select.Item
                            item={{ label: role, value: role }}
                            key={role}
                          >
                            {role}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                </div>
                <div className="button-container">
                  <Button type="submit" disabled={!isFormValid}>
                    Update Profile
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Settings;
