import {
  Button,
  Input,
  InputGroup,
  Link,
  Menu,
  Portal,
} from "@chakra-ui/react";
import {
  ChevronDown,
  LogOut,
  Music,
  Search,
  Settings,
  Upload,
  User as UserIcon,
} from "lucide-react";
import { getCurrentUser } from "../services/UserService";
import { useEffect, useState } from "react";
import type { User } from "../models/User";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";

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
            <Link href="/" className="header-link">
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
          <div className="header-theme-switcher">
            <ThemeSwitcher />
          </div>
          <div className="header-upload-button">
            <Link href="/upload" className="header-link">
              <Button variant={"solid"} className="header-upload-button-text">
                <Upload />
              </Button>
            </Link>
          </div>
          {user ? (
            <div className="header-menu-container">
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="outline" size="sm">
                    <span className="header-username">{user.name}</span>
                    <ChevronDown />
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item value="settings">
                        <Settings />
                        Settings
                      </Menu.Item>
                      <Menu.Item value="sheet-music">
                        <Music />
                        Music
                      </Menu.Item>
                      <Menu.Item value="logout">
                        <LogOut />
                        Logout
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </div>
          ) : (
            <div className="header-login-button">
              <Link href="/login" className="header-link">
                <Button variant={"solid"} className="header-login-button-text">
                  <UserIcon />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
