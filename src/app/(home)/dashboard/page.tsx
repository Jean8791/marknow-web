'use client';

import {CalendarClock, Loader2} from 'lucide-react';
import {useDashboardController} from "@/app/(home)/dashboard/useDashboardController";

const DESCRICAO_PERFIL: Record<string, string> = {
    SUPER_ADMIN: 'Administração da plataforma: prestadores, planos, assinaturas e convites.',
    ADMIN: 'Administração da sua unidade: dados do prestador e usuários.',
    OPERACIONAL: 'Acesso operacional da unidade.',
};

export default function DashboardPage() {
    const {stats, nome, perfil} = useDashboardController();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">{nome ? `Olá, ${nome.split(' ')[0]}` : 'Dashboard'}</h1>
                <p className="text-gray-500 text-sm">{DESCRICAO_PERFIL[perfil] ?? 'Bem-vindo ao MarkNow.'}</p>
            </div>

            {stats.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label}
                             className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`inline-flex p-3 rounded-2xl mb-4 ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24}/>
                            </div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-800 mt-1">
                                {stat.value === undefined ? <Loader2 className="animate-spin text-gray-300" size={22}/> : (stat.value ?? '—')}
                            </h3>
                        </div>
                    ))}
                </div>
            )}

            {perfil !== 'SUPER_ADMIN' && (
                <div className="bg-white rounded-3xl border border-dashed border-purple-200 p-8 flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                        <CalendarClock size={24}/>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">Agenda em desenvolvimento</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            O módulo de agendamento por horários é a próxima fase do MarkNow. Por enquanto, a
                            plataforma cobre contas, planos, assinaturas, convites e usuários da unidade.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
