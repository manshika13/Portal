
import { BrowserRouter, Routes, Route, useLocation,Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import RefrshHandler from './RefreshHandler';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AadhaarCorrection from "./pages/AadhaarCorrection";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailsPage from "./pages/DetailsPage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar"; 
import NotFound from "./NotFound";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <GoogleOAuthProvider clientId="918573652448-mm2hbdc6dj4j398j10hdg4o55jjt3oei.apps.googleusercontent.com">
      <BrowserRouter>
        <MainApp isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

function MainApp({ isAuthenticated, setIsAuthenticated, handleLogout }) {
  const location = useLocation();
  const hideSideBar = location.pathname === "/signup" || location.pathname === "/login" || location.pathname==="*";
  const PrivateRoute = ({ element }) => (isAuthenticated ? element : <Navigate to="/login" />);

  return (
    <>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      {!hideSideBar && <Sidebar isAuthenticated={isAuthenticated} />}

      <div className="container mt-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/aadhaar-correction" element={<AadhaarCorrection />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
