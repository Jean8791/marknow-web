export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export type ListParams = Record<string, string | number | undefined>;
