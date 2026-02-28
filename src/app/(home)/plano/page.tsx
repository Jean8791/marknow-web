'use client';

import {Plus, Search, Ticket} from 'lucide-react';
import DataTable, {Column} from '@/components/common/DataTable';
import Link from 'next/link';
import {PlanoResponse} from "@/types/plano/planoResponse";
import {usePlanoListController} from "@/app/(home)/plano/usePlanoListController";

export default function PlanoListPage() {
    const {
        planos,
        isLoading,
        currentPage,
        totalPages,
        totalElements,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleSearch,
        handleEdit
    } = usePlanoListController();

    const columns: Column<PlanoResponse>[] = [
        {
            header: 'Plano', key: 'nome', render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Ticket size={18}/></div>
                    <span className="font-bold text-gray-700">{item.nome}</span>
                </div>
            )
        },
        {header: 'Limite Age.', key: 'limiteAgendamentos'},
        {
            header: 'Valor', key: 'valor', render: (item) => (
                <span className="font-semibold text-gray-600">
                {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.valor)}
            </span>
            )
        },
        {header: 'Dias Trial', key: 'diasTrial'},
        {
            header: 'Status', key: 'status', render: (item) => (
                <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.status === 'ATIVO' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {item.status}
            </span>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Planos de Assinatura</h1>
                    <p className="text-sm text-gray-500 font-medium">Gerencie os pacotes e preços do sistema.</p>
                </div>
                <Link href="/plano/new"
                      className="bg-[#2D0066] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-purple-900 transition-all shadow-lg shadow-purple-100">
                    <Plus size={20}/> Novo Plano
                </Link>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input type="text" placeholder="Pesquisar planos..." onChange={(e) => handleSearch(e.target.value)}
                           className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium transition-all"/>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={planos}
                currentPage={currentPage}
                totalPages={totalPages}
                totalElements={totalElements}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleEdit}
            />
        </div>
    );
}