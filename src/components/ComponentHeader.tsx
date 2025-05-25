import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const ComponentHeader = () => {
  return (
    <div className="component-header">
      <div className="component-link">
        <Link to={"/"} className="component-link-text">
          <ArrowLeft className="component-icon" />
        </Link>
        <h2 className="component-title">Back to home</h2>
      </div>
    </div>
  );
};
