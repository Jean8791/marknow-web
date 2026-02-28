import {useCallback, useEffect, useState} from "react";

import {notify} from "@/utils/toast-service";
import {PlanoResponse} from "@/types/plano/planoResponse";
import {PlanoService} from "@/app/(home)/plano/plano.service";
import {router} from "next/client";

export const usePlanoListController = () => {
    const [planos, setPlanos] = useState<PlanoResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");

    const loadPlanos = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await PlanoService.list({
                page: currentPage,
                size: pageSize,
                sort: 'nome',
                search: search || undefined
            });
            setPlanos(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
        } catch (error) {
            notify.error("Erro ao carregar planos");
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, search]);

    const handleSearch = (val: string) => {
        setSearch(val);
        setCurrentPage(0);
    }

    const handleEdit = (item: PlanoResponse) => {
        router.push(`/plano/${item.oid}`);
    };

    useEffect(() => {
        loadPlanos();
    }, [loadPlanos]);

    return {
        planos,
        isLoading,
        currentPage,
        totalPages,
        totalElements,
        pageSize,
        handlePageChange: setCurrentPage,
        handlePageSizeChange: setPageSize,
        handleSearch,
        handleEdit
    };
};