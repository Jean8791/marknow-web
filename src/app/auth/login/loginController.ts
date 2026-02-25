import React, {useState} from "react";
import {useRouter} from "next/navigation"; // No Next.js 13+ use navigation
import {api} from "@/services/api";
import {AxiosError} from "axios";

import {LoginRequestDTO, LoginResponseDTO} from '@/types/auth';

export const useLoginController = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const [email, setEmail] = useState('jean@email.com');
    const [senha, setSenha] = useState('@Senha@123');

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const response = await api.post<LoginResponseDTO>('/auth/login', {email, senha} as LoginRequestDTO);

            // Dica: use um prefixo no localStorage para evitar conflitos
            localStorage.setItem('@MarkNow:token', response.data.token);

            router.push('/dashboard');
        } catch (err) {
            // Verificamos se o erro é uma instância do AxiosError
            const axiosError = err as AxiosError<{ message: string }>;

            // Pegamos a mensagem que vem do seu Backend (Quarkus)
            // Se não houver mensagem, usamos uma padrão
            const errorMessage = axiosError.response?.data?.message || 'Erro ao conectar com o servidor.';

            setError(errorMessage);
            console.error('Falha no login:', axiosError);
        } finally {
            setLoading(false);
        }
    }

    return {
        email,
        setEmail,
        senha,
        setSenha,
        loading,
        error,
        handleSubmit
    };
}