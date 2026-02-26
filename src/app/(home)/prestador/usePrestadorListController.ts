'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

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

    const [prestadores, setPrestadores] = useState<Prestador[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Controle do Modal
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; item: Prestador | null; }>({
        isOpen: false,
        item: null
    });

    const openDeleteModal = (item: Prestador) => {
        setModalConfig({isOpen: true, item});
    };

    useEffect(() => {
        fetchPrestadores();
    }, [currentPage, pageSize, search]);

    const fetchPrestadores = async () => {
        setIsLoading(true);
        try {
            // Simulação de chamada API
            const mockData: Prestador[] = [
                {
                    oid: '1',
                    nome: 'CodeNest Solutions',
                    documento: '12.345.678/0001-90',
                    email: 'contato@codenest.com.br',
                    telefone: '(47) 99999-9999',
                    status: 'Ativo'
                },
                {
                    oid: '2',
                    nome: 'Consultório da Laura',
                    documento: '51.334.128/0001-06',
                    email: 'admin@laura.com.br',
                    telefone: '(11) 98888-8888',
                    status: 'Ativo'
                }
            ];

            setPrestadores(mockData);
            setTotalElements(2);
            setTotalPages(1);
        } catch (error) {
            console.error("Erro ao carregar prestadores", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (item: Prestador) => {
        router.push(`/prestador/${item.oid}`);
    };

    const handleDelete = async () => {
        if (modalConfig.item) {
            // Lógica de delete no Axios aqui...
            console.log("Deletando via API:", modalConfig.item.oid);

            // Fecha o modal e recarrega a lista
            setModalConfig({isOpen: false, item: null});
            fetchPrestadores();
        }
    };

    const handlePageChange = (page: number) => setCurrentPage(page);

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
        modalConfig, // Exportado para a View
        setModalConfig, // Exportado para fechar o modal
        openDeleteModal, // Exportado para o botão da tabela
        handleEdit,
        handleDelete, // Função de confirmação real
        handlePageChange,
        handlePageSizeChange,
        handleSearch
    };
}