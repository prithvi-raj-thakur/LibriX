import axios from "axios";

const buyerAxios = axios.create({
  baseURL: "http://localhost:3000/api",
});

buyerAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("buyerAccessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default buyerAxios;
