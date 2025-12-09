import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import { Provider } from "./components/ui/provider";
import Home from "./components/home/home";
import Login from "./components/authentication/login/login";
import Register from "./components/authentication/register/register";
import { UserProvider } from "./providers/user-provider";
import Sidebar from "./components/sidebar/sidebar";
import Settings from "./components/settings/settings";
import { useRef, useState } from "react";
import Profile from "./components/profile/profile";
import Scores from "./components/scores/scores";
import MusicSheet from "./components/sheet-music/sheet-music";
import { SheetMusicProvider } from "./providers/sheet-music-provider";
import SearchResults from "./components/search-results/search-results";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  const location = useLocation();
  const sidebarHiddenRoutes = [
    /^\/login$/,
    /^\/register$/,
    /^\/$/,
    /^\/upload$/,
    /^\/settings$/,
    /^\/user\/[^/]+\/scores\/[^/]+$/,
  ];
  const pathName = location.pathname;

  const isSidebarHidden = sidebarHiddenRoutes.some((regex) =>
    regex.test(pathName)
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <UserProvider>
      <SheetMusicProvider>
        <Provider>
          <nav className="header">
            <Header />
          </nav>
          <main className="main">
            {!isSidebarHidden && (
              <div
                className={`sidebar${sidebarOpen ? " sidebar-open" : ""}`}
                ref={sidebarRef}
              >
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  sidebarRef={sidebarRef}
                />
              </div>
            )}
            <div
              className="content"
              style={
                isSidebarHidden
                  ? { width: "100%" }
                  : sidebarOpen
                  ? { width: "calc(100vw - 720px)", marginLeft: "300px" }
                  : { width: "calc(100vw - 90px)", marginLeft: "90px" }
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard/users/:username"
                  element={<Profile />}
                />
                <Route
                  path="/dashboard/users/:username/scores"
                  element={<Scores />}
                />
                <Route path="/dashboard/settings" element={<Settings />} />
                <Route
                  path="/dashboard/users/:username/scores/:scoreId"
                  element={<MusicSheet />}
                />
                <Route path="/dashboard/search" element={<SearchResults />} />
              </Routes>
            </div>
          </main>
        </Provider>
      </SheetMusicProvider>
    </UserProvider>
  );
}

export default App;
