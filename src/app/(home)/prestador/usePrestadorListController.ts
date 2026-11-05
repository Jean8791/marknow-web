'use client';

import {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {api} from "@/services/api";
import {PrestadorDetalhado} from "@/types/prestador/prestadorDetalhado";
import {PrestadorService} from "@/app/(home)/prestador/prestador.service";
import {notify} from "@/utils/toast-service";
import {mensagemErro} from "@/utils/apiError";

export function usePrestadorListController() {
    const router = useRouter();

    const [prestadores, setPrestadores] = useState<PrestadorDetalhado[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');

    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; item: PrestadorDetalhado | null; }>({
        isOpen: false,
        item: null
    });

    const [drawerConfig, setDrawerConfig] = useState<{
        isOpen: boolean;
        item: PrestadorDetalhado | null;
    }>({
        isOpen: false,
        item: null
    });

    const openDetails = (item: PrestadorDetalhado) => {
        setDrawerConfig({isOpen: true, item});
    };

    const fetchPrestadores = useCallback(async () => {
        setIsLoading(true);
        try {

            const {content, totalElements, totalPages} = await PrestadorService.getAll({
                page: currentPage,
                size: pageSize,
                sort: 'nome',
                search: search || undefined
            });

            setPrestadores(content);
            setTotalElements(totalElements);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Erro ao carregar prestadores:", error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPrestadores();
        }, 400);

        return () => clearTimeout(timer);
    }, [fetchPrestadores]);

    const handleEdit = (item: PrestadorDetalhado) => {
        router.push(`/prestador/${item.oid}`);
    };

    const openCancelarModal = (item: PrestadorDetalhado) => {
        setModalConfig({isOpen: true, item});
    };

    const handleCancelar = async () => {
        if (!modalConfig.item) return;

        try {
            setIsLoading(true);

            await api.delete(`/prestador/${modalConfig.item.oid}`);

            setModalConfig({isOpen: false, item: null});

            notify.success("Prestador excluído.");
            if (prestadores.length === 1 && currentPage > 0) {
                setCurrentPage(prev => prev - 1);
            } else {
                fetchPrestadores();
            }
        } catch (error) {
            notify.error(mensagemErro(error, "Não foi possível excluir o prestador."));
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(0);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(0);
    };

    return {
        prestadores,
        currentPage,
        pageSize,
        totalElements,
        totalPages,
        isLoading,
        modalConfig,
        setModalConfig,
        openCancelarModal,
        handleEdit,
        handleCancelar,
        handlePageChange,
        handlePageSizeChange,
        handleSearch,
        drawerConfig,
        setDrawerConfig,
        openDetails
    };
}