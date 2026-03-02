import {useRouter} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {UsuarioResponse} from "@/types/usuario/usuarioResponse";
import {UsuarioService} from "@/app/(home)/usuario/usuario.service";

export const useUsuarioListController = () => {
    const router = useRouter();
    const [usuarios, setUsuario] = useState<UsuarioResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");

    const loadUsuarios = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await UsuarioService.list({
                page: currentPage,
                size: pageSize,
                search: search || undefined,
                sort: 'nome'
            });
            setUsuario(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, search]);

    const handleSearch = (val: string) => {
        setSearch(val);
        setCurrentPage(0);
    }

    const handleEdit = (item: UsuarioResponse) => {
        if (item?.oid) {
            router.push(`/usuario/${item.oid}`);
        } else {
            console.log("item.oid is null");
        }
    }

    useEffect(() => {
        loadUsuarios();
    }, [loadUsuarios]);

    return {
        usuarios,
        isLoading,
        currentPage,
        totalPages,
        totalElements,
        pageSize,
        handlePageChange: setCurrentPage,
        handlePageSizeChange: setPageSize,
        handleSearch,
        handleEdit,
    }

};