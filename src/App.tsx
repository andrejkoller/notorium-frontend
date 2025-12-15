import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Login from "./components/authentication/login/login";
import { UserProvider } from "./providers/user-provider";
import Sidebar from "./components/dashboard/dashboard-sidebar/dashboard-sidebar";
import Settings from "./components/settings/settings";
import Profile from "./components/profile/profile";
import Scores from "./components/scores/scores";
import MusicSheet from "./components/sheet-music/sheet-music";
import { SheetMusicProvider } from "./providers/sheet-music-provider";
import SearchResults from "./components/search-results/search-results";
import Dashboard from "./components/dashboard/dashboard";
import SignUp from "./components/authentication/signup/signup";
import Upload from "./components/upload/upload";
import DashboardHeader from "./components/dashboard/dashboard-header/dashboard-header";
import { ThemeProvider } from "./providers/theme-provider";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

function App() {
  const location = useLocation();
  const sidebarHiddenRoutes = [/^\/login$/, /^\/signup$/, /^\/$/];
  const dashboardHeaderHiddenRoutes = [/^\/login$/, /^\/signup$/, /^\/$/];
  const pathName = location.pathname;

  const showHeader = pathName === "/";

  const isSidebarHidden = sidebarHiddenRoutes.some((regex) =>
    regex.test(pathName)
  );

  const isDashboardHeaderHidden = dashboardHeaderHiddenRoutes.some((regex) =>
    regex.test(pathName)
  );

  return (
    <ChakraProvider value={defaultSystem}>
      <UserProvider>
        <ThemeProvider>
          <SheetMusicProvider>
            {showHeader && <Header />}
            <main className="main">
              {!isSidebarHidden && <Sidebar />}
              <div
                className="content"
                style={
                  isSidebarHidden
                    ? { width: "100%" }
                    : {
                        width: `calc(100% - var(--sidebar-width))`,
                        marginLeft: `var(--sidebar-width)`,
                      }
                }
              >
                {!isDashboardHeaderHidden && <DashboardHeader />}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/upload" element={<Upload />} />
                  <Route
                    path="/dashboard/user/:username"
                    element={<Profile />}
                  />
                  <Route
                    path="/dashboard/user/:username/scores"
                    element={<Scores />}
                  />
                  <Route path="/dashboard/settings" element={<Settings />} />
                  <Route
                    path="/dashboard/user/:username/scores/:scoreId"
                    element={<MusicSheet />}
                  />
                  <Route path="/dashboard/search" element={<SearchResults />} />
                </Routes>
              </div>
            </main>
          </SheetMusicProvider>
        </ThemeProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
