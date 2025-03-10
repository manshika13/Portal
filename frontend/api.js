import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// 🔹 Google Authentication
export const googleAuth = async (code) => {
  try {
    const response = await api.get("/auth/google", { params: { code } });
    return response.data;
  } catch (error) {
    console.error("Google Auth Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error || "Google authentication failed"
    );
  }
};

// 🔹 Manual Login
export const loginUser = async (email, password) => {
  try {
    const response = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

// 🔹 Signup
export const signupUser = async (name, email, password) => {
  console.log("Hello");
  try {
    const res = await api.post("/auth/signup", { name, email, password });

    return res.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Signup failed");
  }
};

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/auth/",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const googleAuth = async (code) => {
//   try {
//     const response = await api.get(`/google?code=${code}`);
//     return response.data;
//   } catch (error) {
//     console.error("Google Auth Error:", error.response?.data || error.message);
//     throw new Error(
//       error.response?.data?.error || "Google authentication failed"
//     );
//   }
// };

// // Manual Login with Email & Password
// // export const loginUser = (email, password) =>
// //   api.post("/login", { email, password });
// export const loginUser = async (email, password) => {
//   return await fetch("/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   }).then(async (response) => {
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Login failed");
//     }
//     return response.json(); // Ensure JSON response
//   });
// };

// // 🔹 SIGNUP
// export const signupUser = async (name, email, password) => {
//   return await fetch("/signup",
//     {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, email, password }),
//   }).then(async (response) => {
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Signup failed");
//     }
//     return response.json(); // Ensure JSON response
//   });
// };
