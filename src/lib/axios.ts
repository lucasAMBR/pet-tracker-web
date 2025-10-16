import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('trackerAuthToken');

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},
    (error) => {
        return Promise.reject(error);
    }
)