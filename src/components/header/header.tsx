import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-logo">
          <Link to={"/"} className="header-link">
            <h1 className="header-link-text">Notorium</h1>
          </Link>
        </div>
        <ul className="header-navigation">
          <li className="header-navigation-item">
            <Link to={"/make-music"} className="header-link">
              Make Music
            </Link>
          </li>
          <li className="header-navigation-item">
            <Link to={"/distribute"} className="header-link">
              Distribute
            </Link>
          </li>
          <li className="header-navigation-item">
            <Link to={"/collaborate"} className="header-link">
              Collaborate
            </Link>
          </li>
          <li className="header-navigation-item">
            <Link to={"/grow"} className="header-link">
              Grow
            </Link>
          </li>
        </ul>
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
      </div>
    </div>
  );
}

export default Header;
