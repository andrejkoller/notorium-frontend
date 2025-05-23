import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Provider } from "./components/ui/provider";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <Provider>
      <nav className="header">
        {!isLoginPage && !isRegisterPage && <Header />}
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Provider>
  );
}

export default App;
