'use client';

import {ArrowUpRight} from 'lucide-react';
import {useDashboardController} from "@/app/(home)/dashboard/dashboardController";

export default function DashboardPage() {

    const {stats} = useDashboardController();

    return (
        <div className="space-y-8">

            {/* Cabeçalho da Página */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard de Controle</h1>
                <p className="text-gray-500 text-sm">Bem-vindo ao painel administrativo do MarkNow.</p>
            </div>

            {/* Grid de Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index}
                         className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24}/>
                            </div>
                            <span
                                className="text-green-500 text-xs font-bold flex items-center bg-green-50 px-2 py-1 rounded-lg">
                <ArrowUpRight size={14}/> +4%
              </span>
                        </div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-2xl font-black text-gray-800 mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Área de Conteúdo Inferior (Exemplo: Tabela ou Gráfico) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Card de Atividades Recentes */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-gray-800 mb-6">Atividades Recentes</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item}
                                 className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0">
                                <div
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
                                    {item}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-700">Novo agendamento realizado</p>
                                    <p className="text-xs text-gray-400">Há 15 minutos por João da Silva</p>
                                </div>
                                <span
                                    className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Pendente</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}