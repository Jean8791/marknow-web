import {useCallback, useEffect, useState} from "react";
import {ConviteResponse} from "@/types/convite/conviteResponse";
import {ConviteService} from "@/app/(home)/convite/convites.service";

export const useConviteListController = () => {
    const [convites, setConvites] = useState<ConviteResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");

    const loadConvites = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await ConviteService.list(currentPage, pageSize, search);

            setConvites(data.content);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, search]);

    useEffect(() => {
        loadConvites();
    }, [loadConvites]);

    return {
        convites,
        isLoading,
        currentPage,
        pageSize,
        totalElements,
        totalPages,
        handlePageChange: setCurrentPage,
        handlePageSizeChange: setPageSize,
        handleSearch: setSearch,
        refresh: loadConvites
    };
};