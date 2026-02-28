'use client';

import {Calendar, Search, ShieldCheck} from 'lucide-react';
import DataTable, {Column} from '@/components/common/DataTable';
import {useAssinaturasController} from './useAssinaturasController';
import {AssinaturaResponse} from "@/types/assinatura/assinaturaResponse";

export default function AssinaturaPage() {
    const {
        assinaturas,
        isLoading,
        currentPage,
        totalPages,
        totalElements,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleSearch
    } = useAssinaturasController();

    const formatData = (data: string | null) => {
        if (!data) return '---';
        return new Date(data).toLocaleDateString('pt-BR');
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'ATIVA':
                return 'bg-green-50 text-green-600 border-green-100';
            case 'TRIAL':
                return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'INADIMPLENTE':
                return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'SUSPENSA':
                return 'bg-gray-100 text-gray-500 border-gray-200';
            case 'CANCELADA':
                return 'bg-red-50 text-red-600 border-red-100';
            default:
                return 'bg-gray-50 text-gray-400';
        }
    };

    const columns: Column<AssinaturaResponse>[] = [
        {
            header: 'Plano / ID',
            key: 'plano',
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                        <ShieldCheck size={18}/>
                    </div>
                    <div>
                        <p className="font-bold text-gray-700 leading-tight">{item.plano}</p>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">REF: {item.referenciaProvedor || 'INTERNA'}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Status',
            key: 'status',
            render: (item) => (
                <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyles(item.status)}`}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Fim do Período',
            key: 'fimPeriodoAtual',
            render: (item) => (
                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} className="text-gray-400"/>
                    <span className="text-sm font-medium">{formatData(item.fimPeriodoAtual)}</span>
                </div>
            )
        },
        {
            header: 'Provedor',
            key: 'provedor',
            render: (item) => (
                <span className="text-xs font-bold text-gray-500 uppercase">{item.provedor || 'MARKNOW'}</span>
            )
        },
        {
            header: 'Tolerância',
            key: 'toleranciaAte',
            render: (item) => (
                <p className="text-xs text-orange-500 font-semibold italic">
                    {item.status === 'INADIMPLENTE' ? formatData(item.toleranciaAte) : '-'}
                </p>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Assinaturas</h1>
                    <p className="text-sm text-gray-500 font-medium">Controle financeiro e recorrência das unidades.</p>
                </div>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input
                        type="text"
                        placeholder="Pesquisar por referência ou plano..."
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium transition-all"
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={assinaturas}
                currentPage={currentPage}
                totalPages={totalPages}
                totalElements={totalElements}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isLoading={isLoading}
                onCancel={(item) => console.log('Cancelar assinatura', item.oid)}
            />
        </div>
    );
}