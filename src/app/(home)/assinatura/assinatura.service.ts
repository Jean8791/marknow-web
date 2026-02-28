import {api} from "@/services/api";
import {AssinaturaResponse} from "@/types/assinatura/assinaturaResponse";

export const AssinaturaService = {
    list: async (params: any) => {
        const response = await api.get('/assinatura', {params});
        return response.data;
    },

    getById: async (oid: string) => {
        const {data} = await api.get<AssinaturaResponse>(`/assinatura/${oid}`);
        return data;
    },

    cancel: async (oid: string) => {
        return api.post(`/assinatura/${oid}/cancelar`);
    }
};