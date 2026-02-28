'use client';

import {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {api} from "@/services/api";
import {PrestadorDetalhado} from "@/types/prestador/prestadorDetalhado";
import {PrestadorService} from "@/app/(home)/prestador/prestador.service";

export function usePrestadorListController() {
    const router = useRouter();

    const [prestadores, setPrestadores] = useState<PrestadorDetalhado[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
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
                page: currentPage - 1,
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

            if (prestadores.length === 1 && currentPage > 1) {
                setCurrentPage(prev => prev - 1);
            } else {
                fetchPrestadores();
            }
        } catch (error) {
            console.error("Erro ao excluir prestador:", error);
            alert("Não foi possível excluir o prestador. Verifique se ele possui vínculos.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    return {
        prestadores,
        currentPage,
        pageSize,
        totalElements,
        totalPages,
        isLoading,
        modalConfig,
        isSuperAdmin: userRole === 'SUPER_ADMIN',
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