import {api} from "@/services/api";
import {UsuarioResponse} from "@/types/usuario/usuarioResponse";

export const UsuarioService = {
    list: async (params: any) => {
        const {data} = await api.get('/usuario', {params});
        return data;
    },

    getById: async (oid: string) => {
        const {data} = await api.get<UsuarioResponse>(`/usuario/${oid}`);
        return data;
    },

    save: async (payload: any) => {
        if (payload.oid) {
            return api.put(`/usuario/${payload.oid}`, payload);
        }
        return api.post('/usuario', payload);
    },

    delete: async (oid: string) => {
        return api.delete(`/usuario/${oid}`);
    }
};