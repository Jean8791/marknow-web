'use client';

import {Calendar, Copy, Plus, Search, Ticket} from 'lucide-react';
import Link from 'next/link';
import DataTable, {Column} from '@/components/common/DataTable';
import {useConviteListController} from './useConviteListController';
import {notify} from '@/utils/toast-service';
import {ConviteResponse} from "@/types/convite/conviteResponse";

export default function ConvitesList() {
    const {
        convites,
        currentPage,
        pageSize,
        totalElements,
        totalPages,
        isLoading,
        handlePageChange,
        handlePageSizeChange,
        handleSearch
    } = useConviteListController();

    const copiarLink = (codigo: string) => {
        const link = `${window.location.origin}/auth/register/${codigo}`;
        navigator.clipboard.writeText(link);
        notify.info("Link de cadastro copiado!");
    };

    const columns: Column<ConviteResponse>[] = [
        {
            header: 'Descrição / Código',
            key: 'descricao',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 shrink-0">
                        <Ticket size={20}/>
                    </div>
                    <div>
                        <p className="font-bold text-gray-700 leading-tight">{item.descricao}</p>
                        <p className="text-[11px] text-purple-500 font-mono font-bold uppercase tracking-wider mt-0.5">
                            {item.codigo}
                        </p>
                    </div>
                </div>
            )
        },
        {
            header: 'Uso',
            key: 'qtdUsado',
            render: (item) => (
                <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                        <span>{item.qtdUsado} / {item.maxUsos}</span>
                        <span>{Math.round((item.qtdUsado / item.maxUsos) * 100)}%</span>
                    </div>
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="bg-purple-500 h-full transition-all duration-500"
                            style={{width: `${(item.qtdUsado / item.maxUsos) * 100}%`}}
                        />
                    </div>
                </div>
            )
        },
        {
            header: 'Expiração',
            key: 'expiraEm',
            render: (item) => (
                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} className="text-gray-400"/>
                    <span className="text-sm font-medium">
                        {new Date(item.expiraEm).toLocaleDateString('pt-BR')}
                    </span>
                </div>
            )
        },
        {
            header: 'Status',
            key: 'qtdUsado', // Usado para lógica de status
            render: (item) => {
                const isEsgotado = item.qtdUsado >= item.maxUsos;
                const isExpirado = new Date(item.expiraEm) < new Date();

                if (isEsgotado) return (
                    <span
                        className="px-2.5 py-1 bg-gray-100 text-gray-500 text-[10px] font-black uppercase rounded-md border border-gray-200">
                        Esgotado
                    </span>
                );
                if (isExpirado) return (
                    <span
                        className="px-2.5 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase rounded-md border border-red-100">
                        Expirado
                    </span>
                );
                return (
                    <span
                        className="px-2.5 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-md border border-green-100">
                        Ativo
                    </span>
                );
            }
        },
        {
            header: 'Ações',
            headerClassName: 'text-center',
            align: 'center',
            key: 'oid',
            render: (item) => (
                <button
                    onClick={() => copiarLink(item.codigo)}
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Copiar Link de Convite">
                    <Copy size={18}/>
                </button>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight">Convites</h1>
                    <p className="text-sm text-gray-500 font-medium">Gestão de códigos e links de cadastro.</p>
                </div>
                <Link
                    href="/convite/novo"
                    className="flex items-center gap-2 bg-[#2D0066] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-purple-900 transition-all shadow-sm active:scale-95"
                >
                    <Plus size={18}/>
                    Novo Convite
                </Link>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input
                        type="text"
                        placeholder="Filtrar convites por descrição..."
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium transition-all"
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={convites}
                currentPage={currentPage}
                totalPages={totalPages}
                totalElements={totalElements}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isLoading={isLoading}
            />
        </div>
    );
}