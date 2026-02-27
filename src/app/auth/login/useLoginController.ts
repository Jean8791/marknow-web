import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {api} from "@/services/api";
import {AxiosError} from "axios";
import Cookies from 'js-cookie';

import {LoginRequestDTO, LoginResponseDTO} from '@/types/auth';

export const useLoginController = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const [email, setEmail] = useState('admin@barbeariamark.com.br');
    const [senha, setSenha] = useState('SenhaForte#2026');

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const response = await api.post<LoginResponseDTO>('/auth/login', {email, senha} as LoginRequestDTO);
            Cookies.remove('marknow_role', {path: '/'});
            Cookies.remove('marknow_user_oid', {path: '/'});
            Cookies.remove('marknow_prestador_oid', {path: '/'});
            Cookies.remove('marknow_token', {path: '/'});

            const {token, usuario} = response.data;

            localStorage.setItem('@MarkNow:token', token);
            localStorage.setItem('@MarkNow:user-name', usuario.nome);
            localStorage.setItem('@MarkNow:user-role', usuario.perfil);
            localStorage.setItem('@MarkNow:user-prestador_oid', usuario.oidPrestador);

            Cookies.set('marknow_role', usuario.perfil, {expires: 1, path: '/', sameSite: 'lax'});
            Cookies.set('marknow_user_oid', usuario.oid, {expires: 1, path: '/', sameSite: 'lax'});
            Cookies.set('marknow_prestador_oid', usuario.oidPrestador, {expires: 1, path: '/', sameSite: 'lax'});
            Cookies.set('marknow_token', token, {expires: 1, path: '/', sameSite: 'lax'});

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