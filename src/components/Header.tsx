import { Button, Input, InputGroup, Menu, Portal } from "@chakra-ui/react";
import { Search, Upload } from "lucide-react";
import { getCurrentUser } from "../services/UserService";
import { useEffect, useState } from "react";
import type { User } from "../models/User";
import { Link } from "react-router-dom";
import { Tooltip } from "./ui/tooltip";

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

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
          {user ? (
            <div className="header-menu-container">
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="outline" size="sm">
                    <span className="header-username">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item value="profile">
                        <Link
                          to={`/users/${user.username}`}
                          className="header-link"
                        >
                          My Profile
                        </Link>
                      </Menu.Item>
                      <Menu.Item value="scores">
                        <Link
                          to={`/users/${user.username}/scores`}
                          className="header-link"
                        >
                          My Scores
                        </Link>
                      </Menu.Item>
                      <Menu.Item value="settings">
                        <Link to={"/settings"} className="header-link">
                          Settings
                        </Link>
                      </Menu.Item>
                      <Menu.Item value="logout" className="logout-item">
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
        </div>
      </div>
    </div>
  );
};
