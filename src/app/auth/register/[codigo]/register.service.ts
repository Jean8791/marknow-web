import {api} from "@/services/api";
import {CadastroCreateRequest} from "@/types/auth/register";

export const RegisterService = {
    register: async (payload: CadastroCreateRequest) => {
        const response = await api.post('/auth/cadastro/', payload);
        return response.data;
    },
}