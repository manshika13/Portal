import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";


function Navbar({ isAuthenticated, handleLogout }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow">
      {/* Logo */}
      <Link to="/" className="navbar-brand">
        <div>
          <img src="https://wcd.rajasthan.gov.in/assets/images/logo.png" alt="Logo" height="70" />
        </div>
      </Link>

      <div className="heading">
        <p><strong>Women & Child Development Sector</strong></p>
      </div>

      {/* Navbar Toggler */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-controls="navbarNav"
        aria-expanded={isNavOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
        <div className="d-flex flex-grow-1 justify-content-between align-items-center">
          {/* Minister Section (Hidden on Small Screens) */}
          {!isNavOpen && (
            <div style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-4">
                  <img
                    src="https://jankalyanfile.rajasthan.gov.in//Content/UploadFolder/CMProfile/2024/Jun/1_CM_4a8f94bc-1773-48b0-9d53-734d79cbc223.jpeg"
                    alt="minister"
                    height="100"
                    width="100"
                  />
                </div>
                <div className="col-8">
                  <div>
                    <h5>Honorable Chief Minister</h5>
                    <p>
                      <small>Shri BhajanLal Sharma</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Side Buttons */}
          <div className="d-flex p-2">
            {isAuthenticated ? (
              <>
                <button className="btn btn-primary me-2" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn-success me-2">
                  Signup
                </Link>
                <Link to="/" className="btn btn-primary">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
