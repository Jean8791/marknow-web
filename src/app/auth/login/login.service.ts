import {api} from "@/services/api";
import {LoginRequestDTO, LoginResponseDTO} from "@/types/auth";

export const LoginService = {

    login: async (email: string, senha: string) => {
        const response = await api.post<LoginResponseDTO>('/auth/login', {email, senha} as LoginRequestDTO);
        return response.data;
    },


};