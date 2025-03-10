import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// 🔹 Google Authentication

export const googleAuth = async (code) => {
  try {
    const response = await api.get(`/auth/google/${code}`);
    return response;
  } catch (error) {
    console.error("Google Auth Error:", error);
    throw error;
  }
};

// export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);
// export const googleAuth = async (code) => {
//   try {
//     const response = await api.post("/auth/google", { params: { code } });
//     return response.data;
//   }
//    catch (error) {
//     console.error("Google Auth Error:", error.response?.data || error.message);
//     throw new Error(
//       error.response?.data?.error || "Google authentication failed"
//     );
//   }
// };

// 🔹 Manual Login
export const loginUser = async (email, password) => {
  console.log("he");
  try {
    const response = await api.post("/auth/login", { email, password });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

// 🔹 Signup
export const signupUser = async (name, email, password) => {
  try {
    const res = await api.post("/auth/signup", { name, email, password });

    return res.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Signup failed");
  }
};
