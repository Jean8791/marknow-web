import {api} from "@/services/api";
import {RecuperarSenhaProps} from "@/types/auth/recuperarSenha";

export const ForgotPasswordService = {
    sendResetCode: async (email: string) => {
        const response = await api.post('/auth/enviar-email-recuperacao/', {email});
        return response.data;
    },

    resetPassword: async (data: RecuperarSenhaProps) => {
        const response = await api.post('/auth/resetar-senha/', data);
        return response.data;
    }
}