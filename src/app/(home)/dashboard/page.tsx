'use client';

import Link from 'next/link';
import {AlertTriangle, CalendarClock, Loader2} from 'lucide-react';
import {useDashboardController} from "@/app/(home)/dashboard/useDashboardController";

const DESCRICAO_PERFIL: Record<string, string> = {
    SUPER_ADMIN: 'Administração da plataforma: prestadores, planos, assinaturas e convites.',
    ADMIN: 'Agenda, profissionais, serviços e usuários da sua unidade.',
    OPERACIONAL: 'Agenda da unidade: criar, remarcar e cancelar atendimentos.',
};

export default function DashboardPage() {
    const {stats, uso, nome, perfil, iconeUso: IconeUso} = useDashboardController();

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

            {uso && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600"><IconeUso size={22}/></div>
                            <div>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Uso do plano neste mês</p>
                                <p className="text-lg font-black text-gray-800">
                                    {uso.usados}{uso.limite ? ` de ${uso.limite} agendamentos` : ' agendamentos'}
                                </p>
                            </div>
                        </div>
                        {uso.alerta && (
                            <span className={`flex items-center gap-1 text-xs font-bold ${uso.bloqueado ? 'text-red-600' : 'text-amber-600'}`}>
                                <AlertTriangle size={14}/> {uso.bloqueado ? 'Limite atingido' : 'Perto do limite'}
                            </span>
                        )}
                    </div>
                    {uso.limite && (
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div className={`h-full rounded-full ${uso.bloqueado ? 'bg-red-500' : uso.alerta ? 'bg-amber-500' : 'bg-purple-600'}`}
                                 style={{width: `${uso.percentual}%`}}/>
                        </div>
                    )}
                </div>
            )}

            {perfil !== 'SUPER_ADMIN' && perfil && (
                <Link href="/agendamento"
                      className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 rounded-2xl bg-purple-50 text-purple-600"><CalendarClock size={24}/></div>
                    <div>
                        <h3 className="font-bold text-gray-800">Abrir a agenda</h3>
                        <p className="text-sm text-gray-500">Veja o dia por profissional, agende, remarque e avise o cliente pelo WhatsApp.</p>
                    </div>
                </Link>
            )}
        </div>
    );
}
