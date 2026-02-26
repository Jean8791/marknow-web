'use client';

import {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {api} from "@/services/api";

export interface Prestador {
    oid: string;
    nome: string;
    documento: string;
    email: string;
    telefone: string;
    status: 'Ativo' | 'Inativo';
}

export function usePrestadorListController() {
    const router = useRouter();

    // --- ESTADOS DE DADOS ---
    const [prestadores, setPrestadores] = useState<Prestador[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    // --- ESTADOS DE FILTRO E PAGINAÇÃO ---
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');

    // --- CONTROLE DO MODAL DE EXCLUSÃO ---
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; item: Prestador | null; }>({
        isOpen: false,
        item: null
    });

    /**
     * 1. Função de busca estabilizada com useCallback.
     * Ela só é recriada se a página, o tamanho ou o termo de busca mudarem.
     */
    const fetchPrestadores = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/prestador', {
                params: {
                    page: currentPage - 1, // Quarkus é 0-based
                    size: pageSize,
                    sort: 'nome',
                    search: search || undefined // Envia apenas se houver valor
                }
            });

            // Estrutura vinda do seu PageDTO genérico no Quarkus
            const {content, totalElements, totalPages} = response.data;

            setPrestadores(content);
            setTotalElements(totalElements);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Erro ao carregar prestadores:", error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, search]);

    /**
     * 2. Efeito para carregar o perfil e proteger a rota.
     * Roda apenas uma vez quando o componente monta.
     */
    useEffect(() => {
        const role = localStorage.getItem('@MarkNow:user-role');
        setUserRole(role);

        if (role && role !== 'SUPER_ADMIN') {
            router.push('/dashboard');
        }
    }, [router]);

    /**
     * 3. Efeito de busca com DEBOUNCE.
     * Evita que cada tecla digitada dispare uma requisição ao banco.
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPrestadores();
        }, 400); // Aguarda 400ms após o usuário parar de digitar

        return () => clearTimeout(timer);
    }, [fetchPrestadores]);

    // --- HANDLERS DE AÇÃO ---

    const handleEdit = (item: Prestador) => {
        router.push(`/prestador/${item.oid}`);
    };

    const openDeleteModal = (item: Prestador) => {
        setModalConfig({isOpen: true, item});
    };

    const handleDelete = async () => {
        if (!modalConfig.item) return;

        try {
            setIsLoading(true);
            // Chamada real ao @DELETE do seu Resource Java
            await api.delete(`/prestador/${modalConfig.item.oid}`);

            setModalConfig({isOpen: false, item: null});

            // Se deletou o último item da página, volta uma página
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
        setCurrentPage(1); // Sempre volta para a primeira página ao mudar o tamanho
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1); // Reseta a página ao buscar
    };

    return {
        // Dados e Estados
        prestadores,
        currentPage,
        pageSize,
        totalElements,
        totalPages,
        isLoading,
        modalConfig,
        isSuperAdmin: userRole === 'SUPER_ADMIN',

        // Funções de Gerenciamento
        setModalConfig,
        openDeleteModal,
        handleEdit,
        handleDelete,
        handlePageChange,
        handlePageSizeChange,
        handleSearch
    };
}