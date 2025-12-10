import { Button } from "@chakra-ui/react";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="h-title-button-container">
          <div className="h-title-container">
            <p className="h-subtitle">Create. Share. Inspire.</p>
            <h1 className="h-title">
              Find the perfect sheet music for your next performance.
            </h1>
            <p className="h-description">
              Discover, create, and share sheet music with a vibrant community
              of musicians. Whether you're a composer, performer, or music
              enthusiast, Notorium offers the perfect tools to bring your
              musical ideas to life.
            </p>
          </div>
          <div className="h-button-container">
            <Link to="/signup">
              <Button variant={"solid"} className="h-button-get-started">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
