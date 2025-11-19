

// import axios from "axios";

// // Axios instance options
// const options = {
//   baseURL: import.meta.env.VITE_API_URL, // your backend URL from env
//   withCredentials: true, // include cookies if backend uses them
// };

// // Create Axios instance
// const API = axios.create(options);

// // ✅ Request interceptor: attach accessToken from localStorage
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // ✅ Response interceptor: return data or safely reject errors
// API.interceptors.response.use(
//   (response) => response.data, // success → return response data
//   (error) => {
//     if (error.response) {
//       // Backend returned an error
//       const { status, data } = error.response;
//       return Promise.reject({ status, ...data });
//     }
//     // Network error or no response
//     return Promise.reject(error);
//   }
// );

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,  // send cookies automatically
});

// ❌ NO request interceptor needed (cookies handle auth)
// ❌ NO Authorization header needed
// ✔ Only keep the response interceptor

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      return Promise.reject({ status, ...data });
    }
    return Promise.reject(error);
  }
);

export default API;
