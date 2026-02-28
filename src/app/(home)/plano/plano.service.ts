import {PlanoResponse} from "@/types/plano/planoResponse";
import {api} from "@/services/api";

export const PlanoService = {
    list: async (params: any) => {
        const response = await api.get('/plano', {
            params: params
        });
        return response.data;
    },

    getById: async (oid: string) => {
        const {data} = await api.get<PlanoResponse>(`/plano/${oid}`);
        return data;
    },

    save: async (payload: Partial<PlanoResponse>) => {
        if (payload.oid) {
            return api.put(`/plano/${payload.oid}`, payload);
        }
        return api.post('/plano', payload);
    },

    delete: async (oid: string) => {
        return api.delete(`/plano/${oid}`);
    }
};