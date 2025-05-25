import { SelectFilter } from "./SelectFilter";
import { SelectOrder } from "./SelectOrder";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <div className="home-header-title">
            <h1>Explore sheet music</h1>
          </div>
          <div className="home-header-filter">
            <div className="home-header-select-filter">
              <SelectFilter />
            </div>
            <div className="home-header-select-order">
              <SelectOrder />
            </div>
          </div>
        </div>
        <div className="home-body"></div>
      </div>
    </div>
  );
}
