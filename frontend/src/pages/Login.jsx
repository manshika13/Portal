import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth,loginUser } from "../../api";

import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin=useGoogleLogin({
    onSuccess:async(response)=>{
      try{
        if (!response.code) {
          throw new Error("Authorization code not received");
        }
        const result = await googleAuth(response.code);
          const { token, user } = result;
  
          localStorage.setItem("token", token);
          localStorage.setItem("user-info", JSON.stringify(user));
  
          navigate("/dashboard");
      }
      catch (error) {
        console.error("Google Login Error:", error);
        alert("Google Login Failed!");
      }
    },
    flow:"auth-code",
    redirect_uri: "http://localhost:5000/auth/google",

  });
  

  const handleManualLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(
        email,
        password,
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user-info",JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div className="container-fluid d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="p-4 bg-white rounded shadow-lg login-container">
        <h2 className="mb-4 text-center fw-bold">Login</h2>
        <form onSubmit={handleManualLogin}>
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
          <button className="btn btn-primary w-100" type="submit">
              Login
          </button>
        </form>

          < hr/>
        {/* 🔹 Google Login Button */}
      <button onClick={handleGoogleLogin} className="btn btn-danger w-100">
        Login with Google
      </button>
      </div>
    </div>
  );
};

export default Login;

// import { useState } from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import { googleAuth } from "./api";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./login.css";

// const Login=()=> {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("userEmail",email);
//       navigate("/dashboard");
//     } catch (error) {
//       alert("Invalid credentials");
//     }
//   };

//   const GoogleLogin = (props) => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();
//     const responseGoogle = async (authResult) => {
//       try {
//         if (authResult["code"]) {
//           const result = await googleAuth(authResult.code);
//           const {email, name, image} = result.data.user;
//           const token = result.data.token;
//           const obj = {email,name, token, image};
//           localStorage.setItem('user-info',JSON.stringify(obj));
//           navigate('/dashboard');
//         } else {
//           console.log(authResult);
//           throw new Error(authResult);
//         }
//       } catch (e) {
//         console.log('Error while Google Login...', e);
//       }
//     };

//     const googleLogin = useGoogleLogin({
//       onSuccess: responseGoogle,
//       onError: responseGoogle,
//       flow: "auth-code",
//     });

//   return (
//     <div className="container-fluid d-flex vh-100 justify-content-center bg-light">
//       <div className="p-4 bg-white rounded shadow-lg login-container">
//         <h2 className="mb-4 text-center fw-bold">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Email"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button className="btn btn-primary w-100">Login</button>
//         </form>
//         <div className="App">
// 			<button onClick={googleLogin}>
// 				Sign in with Google
// 			</button>
// 		</div>
//       </div>

//     </div>
//   );
// }

// export default Login;
