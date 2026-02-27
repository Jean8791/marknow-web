import {api} from "@/services/api";
import {PagedConviteResponse} from "@/types/convite/pagedConviteResponse";


export const ConviteService = {

    list: async (page: number, size: number, search?: string): Promise<PagedConviteResponse> => {
        const response = await api.get('/convite', {
            params: {
                page,
                size,
                descricao: search
            }
        });
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/convite', data);
        return response.data;
    }
};