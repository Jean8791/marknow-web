import {api} from "@/services/api";
import {PrestadorUpdate} from "@/types/prestador/prestadorUpdate";

export const PrestadorService = {
    getById: async (oid: string) => {
        const response = await api.get<PrestadorUpdate>(`/prestador/${oid}`);
        return response.data;
    },

    update: async (oid: string, data: PrestadorUpdate) => {
        const response = await api.put(`/prestador/${oid}`, data);
        return response.data;
    },

    getCep: async (cep: string) => {
        const cleanCep = cep.replace(/\D/g, '');
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        return response.json();
    }
};