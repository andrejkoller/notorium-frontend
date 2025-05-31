import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Provider } from "./components/ui/provider";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { UserProvider } from "./contexts/UserContext";
import Sidebar from "./components/Sidebar";
import Settings from "./components/Settings";
import { useRef, useState } from "react";
import Profile from "./components/Profile";
import Scores from "./components/Scores";
import MusicSheet from "./components/SheetMusic";
import { SheetMusicProvider } from "./contexts/SheetMusicContext";
import { SearchResults } from "./components/SearchResults";

function App() {
  const location = useLocation();
  const sidebarHiddenRoutes = [
    /^\/login$/,
    /^\/register$/,
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
                  ? { width: "80vw", marginLeft: "20vw" }
                  : { width: "95vw", marginLeft: "5vw" }
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users/:username" element={<Profile />} />
                <Route path="/users/:username/scores" element={<Scores />} />
                <Route path="/settings" element={<Settings />} />
                <Route
                  path="/user/:username/scores/:scoreId"
                  element={<MusicSheet />}
                />
                <Route
                  path="/search"
                  element={<SearchResults />}
                />
              </Routes>
            </div>
          </main>
        </Provider>
      </SheetMusicProvider>
    </UserProvider>
  );
}

export default App;
