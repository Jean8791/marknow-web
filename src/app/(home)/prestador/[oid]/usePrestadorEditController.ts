'use client';

import {useParams, useRouter} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {PrestadorUpdate} from "@/types/prestador/prestadorUpdate";
import {PrestadorService} from "@/app/(home)/prestador/[oid]/prestador.service";

export function usePrestadorEditController() {
    const router = useRouter();
    const params = useParams();
    const oid = params.oid;

    const [prestador, setPrestador] = useState<PrestadorUpdate | null>(null);
    const [loading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const fetchPrestador = useCallback(async () => {
        if (!oid) return;
        setIsLoading(true);
        try {
            const data = await PrestadorService.getById(oid as string);
            setPrestador(data);
        } catch (error) {
            console.error("Erro ao carregar o prestador:", error);
        } finally {
            setIsLoading(false);
        }
    }, [oid]);

    useEffect(() => {
        fetchPrestador();
    }, [fetchPrestador]);

    const handleCepBlur = async (cep: string) => {
        const cleanCep = cep.replace(/\D/g, '');
        if (cleanCep.length !== 8) return;
        try {
            const data = await PrestadorService.getCep(cleanCep);
            if (!data.erro) {
                setPrestador(prev => prev ? {
                    ...prev,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    uf: data.uf
                } : null);
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setPrestador(prev => prev ? {...prev, logoUrl: base64String} : null);
        };
        reader.readAsDataURL(file);
    };

    const handleUpdate = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!oid) return;

        setIsSaving(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            ...data,
            oid: oid,
        }

        try {
            await PrestadorService.update(oid as string, payload as PrestadorUpdate)
            alert("Prestador atualizado com sucesso!");
            router.push('/prestador');
        } catch (error: any) {
            if (error.response?.status === 400) {
                console.table(error.response.data.errors);
                alert("Erro de validação. Verifique os campos preenchidos.");
            } else {
                console.error("Erro desconhecido:", error);
            }
        } finally {
            setIsSaving(false);
        }
    };

    return {
        prestador,
        loading,
        isSaving,
        oid,
        handleCepBlur,
        handleUpdate,
        setPrestador,
        handleLogoChange
    };
}