import {
  Button,
  Dialog,
  Input,
  InputGroup,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { Search, Upload } from "lucide-react";
import { getCurrentUser } from "../../services/user-service";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "../ui/tooltip";
import { Toaster, toaster } from "../ui/toaster";
import UploadDialog from "../dialogs/upload-dialog/upload-dialog";
import { useCurrentUserContext } from "../../contexts/user-context";
import { searchSheetMusic } from "../../services/sheet-music-service";

export const Header = () => {
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    if (currentUser) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setCurrentUser(null);
      navigate("/login");
      toaster.success({
        title: "Logged out successfully",
        description: "You have been logged out.",
      });
    } else {
      console.error("No user is currently logged in.");
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      toaster.error({
        title: "Search Error",
        description: "Please enter a search term.",
      });
      return;
    }

    searchSheetMusic(query)
      .then((results) => {
        if (results.length > 0) {
          navigate(`/search?query=${encodeURIComponent(query)}`);
        } else {
          toaster.info({
            title: "No Results",
            description: "No sheet music found for your search.",
          });
        }
      })
      .catch((error) => {
        console.error("Error searching sheet music:", error);
        toaster.error({
          title: "Search Error",
          description: "An error occurred while searching for sheet music.",
        });
      });
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
        toaster.error({
          title: "Error",
          description: "Failed to fetch current user.",
        });
      }
    };

    fetchCurrentUser();
  }, [setCurrentUser]);

  return (
    <Dialog.Root size={"xl"} modal={false}>
      <div className="header-container">
        <div className="header-content">
          <div className="header-first-part">
            <div className="header-logo">
              <Link to={"/"} className="header-link">
                <h1 className="header-link-text">Notorium</h1>
              </Link>
            </div>
          </div>
          <div className="header-second-part">
            <div className="header-searchbar">
              <InputGroup flex={1} endElement={<Search />}>
                <Input
                  placeholder="Search for sheet music"
                  disabled={!currentUser}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e.currentTarget.value);
                    }
                  }}
                />
              </InputGroup>
            </div>
          </div>
          <div className="header-third-part">
            <div className="header-upload-button">
              <Tooltip
                content="Upload sheet music"
                aria-label="Upload sheet music tooltip"
              >
                <Dialog.Trigger asChild>
                  <Button
                    variant={"solid"}
                    className="header-upload-button-text"
                  >
                    <Upload className="header-upload-icon" />
                  </Button>
                </Dialog.Trigger>
              </Tooltip>
            </div>
            {currentUser ? (
              <Tooltip content="User menu" aria-label="User menu tooltip">
                <div className="header-menu-container">
                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Button variant="outline" size="sm">
                        {currentUser.profileImage ? (
                          <img
                            src={`https://localhost:7189/${currentUser.profileImage}`}
                            alt="Profile"
                            className="header-profile-image"
                          />
                        ) : (
                          <span className="header-image-placeholder">
                            {currentUser?.name
                              ? currentUser?.name?.charAt(0).toUpperCase()
                              : "?"}
                          </span>
                        )}
                      </Button>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item value="profile">
                            <Link
                              to={`/users/${currentUser.username}`}
                              className="header-link"
                            >
                              Profile
                            </Link>
                          </Menu.Item>
                          <Menu.Item value="scores">
                            <Link
                              to={`/users/${currentUser.username}/scores`}
                              className="header-link"
                            >
                              Scores
                            </Link>
                          </Menu.Item>
                          <Menu.Item value="settings">
                            <Link to={"/settings"} className="header-link">
                              Settings
                            </Link>
                          </Menu.Item>
                          <Menu.Item
                            value="logout"
                            className="logout-item"
                            onClick={handleLogout}
                          >
                            Logout
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </div>
              </Tooltip>
            ) : (
              <div className="button-container">
                <Link to={"/login"} className="header-link">
                  <Button variant={"outline"} className="header-login-button">
                    Log in
                  </Button>
                </Link>
                <Link to={"/register"} className="header-link">
                  <Button variant={"solid"} className="header-register-button">
                    Register
                  </Button>
                </Link>
              </div>
            )}
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <UploadDialog />
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
            <Toaster />
          </div>
        </div>
      </div>
    </Dialog.Root>
  );
};
