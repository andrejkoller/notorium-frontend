import { HomeFilter } from "./HomeFilter";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <h1>Explore sheet music</h1>
          <div className="home-header-filter">
            <HomeFilter />
          </div>
        </div>
        <div className="home-body"></div>
      </div>
    </div>
  );
}
