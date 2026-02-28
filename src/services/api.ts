import axios from 'axios';
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9696',
});

// Interceptor de REQUISIÇÃO
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@MarkNow:token');

    // Lista de endpoints que NÃO devem enviar o token
    const publicEndpoints = [
        '/auth/login',
        '/auth/cadastro',
        '/auth/enviar-email-recuperacao',
        '/auth/resetar-senha'
    ];

    // Verifica se a URL atual da requisição está na lista pública
    const isPublicRoute = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

    // Só adiciona o token se houver um e se NÃO for uma rota pública
    if (token && !isPublicRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor de RESPOSTA
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!axios.isAxiosError(error)) return Promise.reject(error);

        const status = error.response?.status;
        const url = error.config?.url ?? "";

        // Verificação para evitar loop de redirecionamento ou deslogar em rotas de Auth
        const isAuthRoute = url.includes("/auth/");

        if (status === 401 && !isAuthRoute) {
            // Limpeza de Cookies
            const cookieOptions = {path: '/'}; // Garante a remoção em qualquer path
            Cookies.remove('marknow_token', cookieOptions);
            Cookies.remove('marknow_role', cookieOptions);
            Cookies.remove('marknow_user_oid', cookieOptions);
            Cookies.remove('marknow_prestador_oid', cookieOptions);

            // Limpeza de LocalStorage
            localStorage.clear();

            // Redirecionamento forçado (apenas se estiver no browser)
            if (typeof window !== "undefined") {
                window.location.href = "/auth/login";
            }
        }

        return Promise.reject(error);
    }
);