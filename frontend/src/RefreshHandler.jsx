import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefrshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const data = localStorage.getItem("user-info");
      if (!data) 
        return; // No user info found

      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (error) {
        console.error("Failed to parse user-info from localStorage:", error);
        localStorage.removeItem("user-info"); // Clear invalid data
        return;
      }

      const token = parsedData?.token;

      if (token) {
        setIsAuthenticated?.(true);

        // Redirect only if on login/signup page
        if (["/", "/login", "/signup"].includes(location.pathname)) {
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (error) {
      console.error("Error in RefrshHandler:", error);
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefrshHandler;


// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function RefrshHandler({ setIsAuthenticated }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const data = localStorage.getItem("user-info");
//     const token = data ? JSON.parse(data)?.token : null;

//     if (token) {
//       setIsAuthenticated(true);
//       if (location.pathname === "/" || location.pathname === "/login") {
//         navigate("/dashboard", { replace: false });
//       }
//     }
//   }, [location, navigate, setIsAuthenticated]);

//   return null;
// }

// export default RefrshHandler;
