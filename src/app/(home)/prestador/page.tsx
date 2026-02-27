'use client';

import {Eye, Plus, Search} from 'lucide-react'; // Adicionei o Eye para o botão de detalhes
import Link from 'next/link';
import DataTable, {Column} from '@/components/common/DataTable';
import {usePrestadorListController} from './usePrestadorListController';
import ConfirmModal from "@/components/common/ConfirmModal";
import DetailsDrawer from "@/components/home/prestador/DetailsDrawer"; // Certifique-se de que o path está correto
import {Prestador} from "@/types/prestador";
import {formatDocumento} from "@/utils/formatDocumento";

export default function PrestadoresList() {
    const {
        prestadores,
        currentPage,
        pageSize,
        totalElements,
        totalPages,
        isLoading,
        modalConfig,
        drawerConfig,
        isSuperAdmin,
        setModalConfig,
        setDrawerConfig,
        openDeleteModal,
        openDetails,
        handleEdit,
        handleDelete,
        handlePageChange,
        handlePageSizeChange,
        handleSearch
    } = usePrestadorListController();

    const columns: Column<Prestador>[] = [
        {
            header: 'Prestador',
            key: 'nome',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold uppercase text-xs shrink-0">
                        {item.nome.substring(0, 2)}
                    </div>
                    <div>
                        <p className="font-bold text-gray-700 leading-tight">{item.nome}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${
                        item.tipoPessoa === 'PF' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-600'
                    }`}>
                        {item.tipoPessoa}
                    </span>
                            <p className="text-[11px] text-gray-400 font-medium">
                                {formatDocumento(item.documento)}
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: 'Plano',
            key: 'nomePlano',
            render: (item) => (
                <div>
                    <p className="text-sm text-gray-600 font-medium">{item.nomePlano || 'Sem Plano'}</p>
                    <p className="text-[10px] text-purple-500 font-bold uppercase tracking-wider">{item.statusAssinatura}</p>
                </div>
            )
        },
        {
            header: 'Validade',
            key: 'fimPeriodoAtual',
            render: (item) => (
                <div>
                    <p className="text-sm text-gray-600">
                        {item.fimPeriodoAtual ? new Date(item.fimPeriodoAtual).toLocaleDateString('pt-BR') : '-'}
                    </p>
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status',
            render: (item) => (
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    'ATIVO' === item.status ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Detalhes',
            headerClassName: 'text-center',
            align: 'center',
            key: 'oid',
            render: (item) => (
                <button
                    onClick={() => openDetails(item)}
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Visualizar Detalhes"
                >
                    <Eye size={18}/>
                </button>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight">Prestadores</h1>
                    <p className="text-sm text-gray-500 font-medium">Gestão de unidades e parceiros MarkNow.</p>
                </div>

                {isSuperAdmin && (
                    <Link href="/prestador/novo"
                          className="bg-[#2D0066] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-purple-900 transition-all shadow-xl shadow-purple-100 active:scale-95">
                        <Plus size={20}/>
                        Novo Prestador
                    </Link>
                )}
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input
                        type="text"
                        placeholder="Pesquisar por nome, documento ou e-mail..."
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium transition-all"
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={prestadores}
                onEdit={handleEdit}
                onDelete={openDeleteModal}
                currentPage={currentPage}
                totalPages={totalPages}
                totalElements={totalElements}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isLoading={isLoading}
            />

            {/* Painel de Detalhes Lateral */}
            <DetailsDrawer
                isOpen={drawerConfig.isOpen}
                onClose={() => setDrawerConfig({...drawerConfig, isOpen: false})}
                item={drawerConfig.item}
            />

            {/* Modal de Confirmação */}
            <ConfirmModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({isOpen: false, item: null})}
                onConfirm={handleDelete}
                title="Excluir Prestador"
                message={`Tem certeza que deseja excluir o prestador ${modalConfig.item?.nome}? Esta ação não poderá ser desfeita.`}
                confirmText="Sim, excluir"
                variant="danger"
            />
        </div>
    );
}