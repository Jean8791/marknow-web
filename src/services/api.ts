import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9696',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@MarkNow:token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!axios.isAxiosError(error)) return Promise.reject(error);

        const status = error.response?.status;
        const url = error.config?.url ?? "";
        const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

        const isAuthRoute = url.includes("/auth/login") || url.includes("/auth/register") || url.includes("/auth/forgot-password");
        const alreadyOnLogin = currentPath.startsWith("/auth/login");

        if (status === 401 && !isAuthRoute && !alreadyOnLogin) {
            localStorage.clear();
            window.location.assign("/auth/login");
            return;
        }

        return Promise.reject(error);
    }
);