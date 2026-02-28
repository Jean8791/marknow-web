import {useCallback, useEffect, useState} from "react";
import {AssinaturaService} from "./assinatura.service";
import {AssinaturaResponse} from "@/types/assinatura/assinaturaResponse";
import {notify} from "@/utils/toast-service";

export const useAssinaturasController = () => {
    const [assinaturas, setAssinaturas] = useState<AssinaturaResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");

    const loadAssinaturas = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await AssinaturaService.list({
                page: currentPage,
                size: pageSize,
                search: search || undefined,
                sort: 'criadoEm'
            });
            setAssinaturas(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
        } catch (error) {
            notify.error("Erro ao carregar assinaturas");
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, search]);

    useEffect(() => {
        loadAssinaturas();
    }, [loadAssinaturas]);

    return {
        assinaturas,
        isLoading,
        currentPage,
        totalPages,
        totalElements,
        pageSize,
        handlePageChange: setCurrentPage,
        handlePageSizeChange: setPageSize,
        handleSearch: (val: string) => {
            setSearch(val);
            setCurrentPage(0);
        },
        loadAssinaturas
    };
};