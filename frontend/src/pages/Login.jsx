import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth, loginUser } from "../../api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Google Login Handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (authResult) => {
      try {
        if (!authResult.code) {
          throw new Error("Authorization code not received");
        }

        // Send the authorization code to the backend
        const result = await googleAuth(authResult.code);

        if (!result.data || !result.data.token) {
          throw new Error("Invalid response from Google authentication");
        }

        const { email, name, image } = result.data.user;
        const token = result.data.token;

        // Store user info in localStorage
        const userInfo = { email, name, token, image };
        localStorage.setItem("user-info", JSON.stringify(userInfo));

        // Redirect to dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Google Login Error:", error);
        alert("Google Login Failed!");
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
      alert("Google Login Failed!");
    },
    flow: "auth-code",
  });

  // 🔹 Manual Login Handler
  const handleManualLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);

      // Store user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user-info", JSON.stringify(res.data.user));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="container-fluid d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="p-4 bg-white rounded shadow-lg login-container">
        <h2 className="mb-4 text-center fw-bold">Login</h2>

        {/* 🔹 Manual Login Form */}
        <form onSubmit={handleManualLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>

        <hr />

        {/* 🔹 Google Login Button */}
        <button onClick={handleGoogleLogin} className="btn btn-danger w-100">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
