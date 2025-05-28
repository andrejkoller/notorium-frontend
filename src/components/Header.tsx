import { Button, Input, InputGroup, Menu, Portal } from "@chakra-ui/react";
import { Search, Upload } from "lucide-react";
import { getCurrentUser } from "../services/UserService";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "./ui/tooltip";
import { useCurrentUser } from "../contexts/UserContext";
import { Toaster, toaster } from "./ui/toaster";

export const Header = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser({
          ...user,
          name: user.name || "Guest",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [setCurrentUser]);

  return (
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
              <Input placeholder="Search for sheet music" />
            </InputGroup>
          </div>
        </div>
        <div className="header-third-part">
          <div className="header-upload-button">
            <Tooltip
              content="Upload sheet music"
              aria-label="Upload sheet music tooltip"
            >
              <Link to={"/upload"} className="header-link">
                <Button variant={"solid"} className="header-upload-button-text">
                  <Upload />
                </Button>
              </Link>
            </Tooltip>
          </div>
          {currentUser ? (
            <div className="header-menu-container">
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="outline" size="sm">
                    {currentUser.profilePicture ? (
                      <img
                        src={`https://localhost:7189/${currentUser.profilePicture}`}
                        alt="Profile"
                        className="header-profile-image"
                      />
                    ) : (
                      <span className="header-image-placeholder">
                        {currentUser?.name
                          ? currentUser.name.charAt(0).toUpperCase()
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
          <Toaster />
        </div>
      </div>
    </div>
  );
};
