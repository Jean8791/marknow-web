'use client';

import {Mail, Phone, Search, UserPlus} from 'lucide-react';
import DataTable, {Column} from '@/components/common/DataTable';
import {useUsuarioListController} from "@/app/(home)/usuario/useUsuarioListController";
import {UsuarioResponse} from "@/types/usuario/usuarioResponse";
import {formatDocumento} from "@/utils/formatDocumento";
import Link from 'next/link';

export default function UsuarioPage() {
    const {
        usuarios,
        isLoading,
        currentPage,
        totalPages,
        totalElements,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleSearch,
        handleEdit
    } = useUsuarioListController();

    const columns: Column<UsuarioResponse>[] = [
        {
            header: 'Usuário',
            key: 'nome',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold uppercase text-xs shrink-0 border-2 border-white shadow-sm">
                        {item.nome.substring(0, 2)}
                    </div>
                    <div>
                        <p className="font-bold text-gray-700 leading-tight">{item.nome}</p>
                        <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                            <Mail size={10}/> {item.email}
                        </p>
                    </div>
                </div>
            )
        },
        {
            header: 'Documento',
            key: 'documento',
            render: (item) => (
                <div className="space-y-0.5">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${
                        item.tipoPessoa === 'PF' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-600'}`}>
                        {item.tipoPessoa}
                    </span>
                    <p className="text-xs text-gray-500 font-medium">
                        {formatDocumento(item.documento)}
                    </p>
                </div>
            )
        },
        {
            header: 'Contato',
            key: 'celular',
            render: (item) => (
                <div className="text-xs text-gray-600 space-y-0.5 font-medium">
                    {item.celular ? (
                        <p className="flex items-center gap-1">
                            <Phone size={12} className="text-gray-400"/>
                            ({item.dddCelular}) {item.celular}
                        </p>
                    ) : (
                        <p className="text-gray-300 italic">Sem celular</p>
                    )}
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status',
            render: (item) => (
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                    item.status === 'ATIVO'
                        ? 'bg-green-50 text-green-600 border-green-100'
                        : 'bg-red-50 text-red-600 border-red-100'}`}>
                    {item.status}
                </span>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Usuários</h1>
                    <p className="text-sm text-gray-500 font-medium">Gerencie o acesso dos colaboradores da sua
                        unidade.</p>
                </div>
                <Link href="/usuario/new"
                      className="bg-[#2D0066] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-purple-900 transition-all shadow-lg shadow-purple-100 active:scale-95">
                    <UserPlus size={20}/> Novo Usuário
                </Link>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input
                        type="text"
                        placeholder="Pesquisar por nome, e-mail ou documento..."
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium transition-all"
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={usuarios}
                currentPage={currentPage}
                totalPages={totalPages}
                totalElements={totalElements}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isLoading={isLoading}
                onEdit={handleEdit}
            />
        </div>
    );
}