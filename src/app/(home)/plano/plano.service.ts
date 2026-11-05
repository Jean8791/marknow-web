import {PlanoResponse} from "@/types/plano/planoResponse";
import {api} from "@/services/api";
import {ListParams, Page} from "@/types/common/page";

export const PlanoService = {
    list: async (params: ListParams) => {
        const response = await api.get<Page<PlanoResponse>>('/plano', {params});
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
};
