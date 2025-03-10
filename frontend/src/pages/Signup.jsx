import { useState } from "react";
import { signupUser } from "../../api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Manual Signup Handler
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Hello");
    try {
      const response = await signupUser(name, email, password);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user-info", JSON.stringify(response.data.user));

      navigate("/login"); // Redirect after successful signup
    } catch (error) {
      alert("Signup failed: " + (error.response?.data?.error || "Unknown error"));
    }
  };


  return (
    <div className="container-fluid d-flex min-vh-100 justify-content-center bg-light">
      <div className="p-4 bg-white rounded shadow-lg signup-container">
        <h2 className="mb-4 text-center fw-bold">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
