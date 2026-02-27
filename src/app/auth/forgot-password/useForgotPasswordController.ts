import {useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import {ForgotPasswordService} from "@/app/auth/forgot-password/forgotPassword.service";
import {notify} from "@/utils/toast-service";
import {RecuperarSenhaProps} from "@/types/auth/recuperarSenha";

export const useForgotPasswordController = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const router = useRouter();

    const handleSendCode = useCallback(async (email: string) => {
        if (!email) return setError("Informe um e-mail válido.");

        setLoading(true);
        setError(null);
        try {
            await ForgotPasswordService.sendResetCode(email);
            notify.success("E-mail enviado! Verifique sua caixa de entrada.");
            setStep(2);
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao enviar e-mail.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleResetPassword = useCallback(async (formData: FormData) => {
        const email = formData.get('email') as string;
        const codigo = formData.get('code') as string;
        const novaSenha = formData.get('newPassword') as string;
        const confirmarSenha = formData.get('confirmPassword') as string;

        if (novaSenha !== confirmarSenha) {
            return setError("As senhas não coincidem.");
        }

        const dto: RecuperarSenhaProps = {
            email,
            codigo,
            novaSenha,
            confirmarSenha
        };

        setLoading(true);
        setError(null);
        try {
            await ForgotPasswordService.resetPassword(dto);
            notify.success("Senha redefinida com sucesso!");
            router.replace('/auth/login');
        } catch (err: any) {
            setError(err.response?.data?.message || "Código inválido ou erro ao resetar.");
        } finally {
            setLoading(false);
        }
    }, [router]);

    return {loading, error, step, handleSendCode, handleResetPassword, setError};
};