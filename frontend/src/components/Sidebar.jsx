import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css"; // Create a separate CSS file for Sidebar

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      <button
        className={`sidebar-btn ${location.pathname === "/aadhaar-correction" ? "active" : ""}`}
        onClick={() => navigate("/aadhaar-correction")}
      >
        Personal
      </button>
      <button
        className={`sidebar-btn ${location.pathname === "/dashboard" ? "active" : ""}`}
        onClick={() => navigate("/dashboard")}
      >
        Society
      </button>
      <button
        className={`sidebar-btn ${location.pathname === "/family" ? "active" : ""}`}
        onClick={() => navigate("/family")}
      >
        Family
      </button>
      <button
        className={`sidebar-btn ${location.pathname === "/government" ? "active" : ""}`}
        onClick={() => navigate("/government")}
      >
        Government
      </button>
    </div>
  );
};

export default Sidebar;
