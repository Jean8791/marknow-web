import {api} from "@/services/api";
import {AssinaturaResponse} from "@/types/assinatura/assinaturaResponse";
import {ListParams, Page} from "@/types/common/page";

export const AssinaturaService = {
    list: async (params: ListParams) => {
        const response = await api.get<Page<AssinaturaResponse>>('/assinatura', {params});
        return response.data;
    },
};
