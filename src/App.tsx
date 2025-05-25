import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Provider } from "./components/ui/provider";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { UserProvider } from "./contexts/UserContext";
import Upload from "./components/Upload";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isUploadPage = location.pathname === "/upload";

  return (
    <UserProvider>
      <Provider>
        <nav className="header">
          {!isLoginPage && !isRegisterPage && !isUploadPage && <Header />}
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
      </Provider>
    </UserProvider>
  );
}

export default App;
