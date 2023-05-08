import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";
// const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

export const fetchData = async (endpoint) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Axios instance for normal API calls
export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios instance to allow credentials for authentication
export const authApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
