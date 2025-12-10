import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../../../hooks/use-current-user";
import "./dashboard-header.css";

function DashboardHeader() {
  const { currentUser } = useCurrentUserContext();

  return (
    <div className="dashboard-header-container">
      <div className="dashboard-header-content">
        <Link
          to={`/user/${currentUser?.username}`}
          className="dashboard-header-profile-link"
        >
          {currentUser?.profileImage ? (
            <img
              src={`https://localhost:7189/${currentUser.profileImage}`}
              alt={currentUser.name}
              className="dashboard-header-profile-image"
            />
          ) : (
            <div className="dashboard-header-profile-placeholder">
              <span>{currentUser?.name?.charAt(0)}</span>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;
