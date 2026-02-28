'use client';

import {ReactNode} from 'react';
import {Ban, ChevronLeft, ChevronRight, Edit, Eye, Trash2} from 'lucide-react';

export interface Column<T> {
    header: string;
    key: keyof T | string;
    render?: (item: T) => ReactNode;
    headerClassName?: string;
    align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onCancel?: (item: T) => void;
    onView?: (item: T) => void;
    isLoading?: boolean;
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export default function DataTable<T>({
                                         columns,
                                         data,
                                         onEdit,
                                         onDelete,
                                         onCancel,
                                         onView,
                                         isLoading,
                                         currentPage,
                                         totalPages,
                                         totalElements,
                                         pageSize,
                                         onPageChange,
                                         onPageSizeChange
                                     }: DataTableProps<T>) {

    if (isLoading) {
        return (
            <div className="w-full space-y-4 animate-pulse">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-2xl w-full"/>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">

                {/* CONTAINER COM SCROLL INTERNO */}
                {/* A altura h-[500px] pode ser alterada conforme sua necessidade */}
                <div className="overflow-x-auto overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-200">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead className="sticky top-0 z-10">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider 
                                    bg-gray-50/90 backdrop-blur-sm border-b border-gray-100
                                    ${col.headerClassName || ''} 
                                    ${col.align === 'center' ? 'text-center' : 'text-left'}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                            {(onEdit || onCancel || onDelete || onView) && (
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center bg-gray-50/90 backdrop-blur-sm border-b border-gray-100">
                                    Ações
                                </th>
                            )}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                        {data && data.length > 0 ? (
                            data.map((item, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50/50 transition-colors group">
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`px-6 py-4 text-sm text-gray-600 ${col.align === 'center' ? 'text-center' : 'text-left'}`}
                                        >
                                            {col.render ? col.render(item) : (item[col.key as keyof T] as ReactNode)}
                                        </td>
                                    ))}

                                    {(onEdit || onCancel || onDelete || onView) && (
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                {onView && (
                                                    <button onClick={() => onView(item)}
                                                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                                                            title="Visualizar">
                                                        <Eye size={18}/>
                                                    </button>
                                                )}
                                                {onEdit && (
                                                    <button onClick={() => onEdit(item)}
                                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                            title="Editar">
                                                        <Edit size={18}/>
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button onClick={() => onDelete(item)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                            title="Excluir">
                                                        <Trash2 size={18}/>
                                                    </button>
                                                )}
                                                {onCancel && (
                                                    <button onClick={() => onCancel(item)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                            title="Excluir">
                                                        <Ban size={18}/>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1}
                                    className="px-6 py-12 text-center text-gray-400 italic">
                                    Nenhum registro encontrado.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* --- RODAPÉ FIXO (Sempre visível abaixo do scroll) --- */}
                <div
                    className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <div className="text-sm text-gray-500 font-medium">
                            Total de <span className="text-gray-800 font-bold">{totalElements}</span> registros
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Exibir:</span>
                            <select
                                value={pageSize}
                                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                                className="bg-white border border-gray-200 text-gray-600 text-xs rounded-lg focus:ring-purple-500 outline-none p-1 font-bold cursor-pointer"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-sm text-gray-500 font-medium">
                            Página <span
                            className="text-gray-800 font-bold">{totalElements > 0 ? currentPage + 1 : 0}</span> de <span
                            className="text-gray-800 font-bold">{totalPages}</span>
                        </span>

                        <div className="flex gap-2">
                            <button
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 0 || isLoading}
                                className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <ChevronLeft size={18} className="text-gray-600"/>
                            </button>
                            <button
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage + 1 >= totalPages || isLoading}
                                className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <ChevronRight size={18} className="text-gray-600"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}