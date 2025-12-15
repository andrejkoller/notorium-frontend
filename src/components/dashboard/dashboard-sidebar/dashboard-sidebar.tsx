import { Link } from "react-router-dom";
import "./dashboard-sidebar.css";
import {
  FolderOpenIcon,
  HelpCircleIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="dashboard-sidebar-container">
      <div className="dashboard-sidebar-header">
        <Link to={"/"}>
          <h1 className="dashboard-sidebar-title">Notorium</h1>
        </Link>
      </div>
      <div className="dashboard-sidebar-body">
        <ul className="dashboard-sidebar-menu">
          <li className="dashboard-sidebar-menu-item">
            <Link to={"/dashboard"} className="dashboard-sidebar-menu-link">
              <FolderOpenIcon className="dashboard-sidebar-menu-icon" />
              <span className="dashboard-sidebar-menu-text">My Library</span>
            </Link>
          </li>
          <li className="dashboard-sidebar-menu-item">
            <Link
              to={"/dashboard/settings"}
              className="dashboard-sidebar-menu-link"
            >
              <SettingsIcon className="dashboard-sidebar-menu-icon" />
              <span className="dashboard-sidebar-menu-text">Settings</span>
            </Link>
          </li>
          <li className="dashboard-sidebar-menu-item">
            <Link to={"/help"} className="dashboard-sidebar-menu-link">
              <HelpCircleIcon className="dashboard-sidebar-menu-icon" />
              <span className="dashboard-sidebar-menu-text">Help</span>
            </Link>
          </li>
          <li className="dashboard-sidebar-menu-item">
            <Link to={"/logout"} className="dashboard-sidebar-menu-link">
              <LogOutIcon className="dashboard-sidebar-menu-icon" />
              <span className="dashboard-sidebar-menu-text">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
