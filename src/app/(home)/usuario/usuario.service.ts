import {api} from "@/services/api";
import {UsuarioResponse} from "@/types/usuario/usuarioResponse";
import {UsuarioRequest} from "@/types/usuario/usuarioResquest";
import {ListParams, Page} from "@/types/common/page";

export const UsuarioService = {
    list: async (params: ListParams) => {
        const {data} = await api.get<Page<UsuarioResponse>>('/usuario', {params});
        return data;
    },

    getById: async (oid: string) => {
        const {data} = await api.get<UsuarioResponse>(`/usuario/${oid}`);
        return data;
    },

    save: async (payload: UsuarioRequest) => {
        if (payload.oid) {
            const {data} = await api.put<UsuarioResponse>(`/usuario/${payload.oid}`, payload);
            return data;
        }
        const {data} = await api.post<UsuarioResponse>('/usuario', payload);
        return data;
    },

    delete: async (oid: string) => {
        return api.delete(`/usuario/${oid}`);
    }
};
