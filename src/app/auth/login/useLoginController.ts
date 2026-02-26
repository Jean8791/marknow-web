import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {api} from "@/services/api";
import {AxiosError} from "axios";

import {LoginRequestDTO, LoginResponseDTO} from '@/types/auth';

export const useLoginController = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const [email, setEmail] = useState('admin@marknow.com.br');
    const [senha, setSenha] = useState('admin123');

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const response = await api.post<LoginResponseDTO>('/auth/login', {email, senha} as LoginRequestDTO);

            const { token, usuario } = response.data;

            localStorage.setItem('@MarkNow:token', token);
            localStorage.setItem('@MarkNow:user-name', usuario.nome);
            localStorage.setItem('@MarkNow:user-role', usuario.perfil);

            router.push('/dashboard');
        } catch (err) {

            const axiosError = err as AxiosError<{ message: string }>;

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