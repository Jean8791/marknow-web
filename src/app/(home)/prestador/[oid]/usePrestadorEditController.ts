import {useParams, useRouter} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {PrestadorUpdate} from "@/types/prestador/prestadorUpdate";
import {api} from "@/services/api";

export function usePrestadorEditController() {
    const router = useRouter();
    const params = useParams();
    const oid = params.oid;

    const [prestador, setPrestador] = useState<PrestadorUpdate | null>(null);
    const [loading, setIsLoading] = useState(false);

    const fetchPrestador = useCallback(async () => {
        if (!oid) return;

        setIsLoading(true);
        try {
            const response = await api.get(`/prestador/${oid}`);
            setPrestador(response.data);
        } catch (error) {
            console.error("Erro ao carregar o prestador:", error);
        } finally {
            setIsLoading(false);
        }
    }, [oid]);

    useEffect(() => {
        fetchPrestador();
    }, [router, fetchPrestador]);

    return {prestador, loading, oid};
}