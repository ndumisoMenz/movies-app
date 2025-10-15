// import axios from 'axios'

// const options={
//     baseURL:import.meta.env.VITE_API_URL,
//     withCredentials:true,
// }

// const API=axios.create(options)

// API.interceptors.response.use(
//     (response)=>response.data,
//     (error)=>{
//         const {status,data}=error.response;
//         return Promise.reject({status,...data})
//     }
// )

// export default API;

import axios from "axios";

// Axios instance options
const options = {
  baseURL: import.meta.env.VITE_API_URL, // your backend URL from env
  withCredentials: true, // include cookies if backend uses them
};

// Create Axios instance
const API = axios.create(options);

// ✅ Request interceptor: attach accessToken from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response interceptor: return data or safely reject errors
API.interceptors.response.use(
  (response) => response.data, // success → return response data
  (error) => {
    if (error.response) {
      // Backend returned an error
      const { status, data } = error.response;
      return Promise.reject({ status, ...data });
    }
    // Network error or no response
    return Promise.reject(error);
  }
);

export default API;