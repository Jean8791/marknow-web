'use client';

import { Plus, Search, MoreVertical, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function PrestadoresList() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Prestadores</h1>
                    <p className="text-sm text-gray-500">Gerencie as unidades e parceiros da plataforma.</p>
                </div>

                <Link
                    href="/prestador/novo"
                    className="bg-[#2D0066] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-900 transition-all"
                >
                    <Plus size={20} />
                    Novo Prestador
                </Link>
            </div>

            {/* Filtros Rápidos */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou CNPJ..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                </div>
            </div>

            {/* Tabela */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Prestador</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Contato</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-center">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">
                                    CN
                                </div>
                                <div>
                                    <p className="font-bold text-gray-700">CodeNest Solutions</p>
                                    <p className="text-xs text-gray-400">12.345.678/0001-90</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <p className="text-sm text-gray-600">contato@codenest.com.br</p>
                            <p className="text-xs text-gray-400">(47) 99999-9999</p>
                        </td>
                        <td className="px-6 py-4">
                            <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold">Ativo</span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex justify-center gap-2">
                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                    <Edit size={18} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}