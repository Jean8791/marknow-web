import {api} from "@/services/api";
import {CadastroCreateRequest} from "@/types/auth/register";
import {PlanoResponse} from "@/types/plano/planoResponse";

export const RegisterService = {
    register: async (payload: CadastroCreateRequest) => {
        const response = await api.post('/auth/cadastro', payload);
        return response.data;
    },

    planos: async () => {
        const {data} = await api.get<PlanoResponse[]>('/auth/planos');
        return data;
    },
}
