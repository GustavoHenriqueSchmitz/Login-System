import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 10000,
    validateStatus: () => true,
});

export default api;
