import { Link } from "react-router-dom";
import "./dashboard-sidebar.css";
import { FolderOpenIcon, HelpCircleIcon, SettingsIcon } from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Notorium</h1>
      </div>
      <div className="sidebar-body">
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <Link to={"/dashboard"} className="sidebar-menu-link">
              <FolderOpenIcon className="sidebar-menu-icon" />
              <span className="sidebar-menu-text">My Library</span>
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to={"/dashboard/settings"} className="sidebar-menu-link">
              <SettingsIcon className="sidebar-menu-icon" />
              <span className="sidebar-menu-text">Settings</span>
            </Link>
          </li>
          <li className="sidebar-menu-item">
            <Link to={"/help"} className="sidebar-menu-link">
              <HelpCircleIcon className="sidebar-menu-icon" />
              <span className="sidebar-menu-text">Help</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
