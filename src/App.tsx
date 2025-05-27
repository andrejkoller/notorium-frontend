import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Provider } from "./components/ui/provider";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { UserProvider } from "./contexts/UserContext";
import Upload from "./components/Upload";
import Sidebar from "./components/Sidebar";
import Settings from "./components/Settings";
import MyScores from "./components/MyScores";
import MyProfile from "./components/MyProfile";
import { useRef, useState } from "react";

function App() {
  const location = useLocation();
  const sidebarHiddenRoutes = [
    "/login",
    "/register",
    "/upload",
    "/settings",
    "/users/",
    "/users/scores",
  ];
  const pathName = location.pathname;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <UserProvider>
      <Provider>
        <nav className="header">
          <Header />
        </nav>
        <main className="main">
          {!sidebarHiddenRoutes.some((p) => pathName.startsWith(p)) && (
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
              !sidebarHiddenRoutes.some((p) => pathName.startsWith(p))
                ? { width: "100%" }
                : sidebarOpen
                ? { width: "80vw" }
                : { width: "95vw" }
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/users/:username" element={<MyProfile />} />
              <Route path="/users/:username/scores" element={<MyScores />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </Provider>
    </UserProvider>
  );
}

export default App;
