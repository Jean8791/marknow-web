import React, {useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import Cookies from 'js-cookie';
import {LoginService} from "@/app/auth/login/login.service";

export const useLoginController = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const senha = formData.get('senha') as string;

        try {
            const data = await LoginService.login(email, senha);

            localStorage.setItem('@MarkNow:token', data.token);
            localStorage.setItem('@MarkNow:user-role', data.usuario.perfil);

            const cookieOptions = {expires: 1, path: '/', sameSite: 'lax' as const};
            Cookies.set('marknow_token', data.token, cookieOptions);
            Cookies.set('marknow_role', data.usuario.perfil, cookieOptions);
            Cookies.set('marknow_user_oid', data.usuario.oid, cookieOptions);
            Cookies.set('marknow_prestador_oid', data.usuario.oidPrestador, cookieOptions);

            router.push('/dashboard');
        } catch (err: any) {
            const msg = err.response?.data?.message || "Credenciais inválidas";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, [loading, router]);

    return {loading, error, handleSubmit};
};