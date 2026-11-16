'use client';

import {useState} from 'react';
import Link from 'next/link';
import {AlertTriangle, CalendarClock, ChevronLeft, ChevronRight, Loader2} from 'lucide-react';
import {useDashboardController} from "@/app/(home)/dashboard/useDashboardController";
import {useGradeDoDia} from "@/app/(home)/dashboard/useGradeDoDia";
import GradeHorarios from "@/components/agenda/GradeHorarios";
import PageHeader from "@/components/common/PageHeader";
import {dataLonga, hojeIso, somarDias} from "@/utils/agenda";

const DESCRICAO_PERFIL: Record<string, string> = {
    SUPER_ADMIN: 'Administração da plataforma: prestadores, planos, assinaturas e convites.',
    ADMIN: 'Agenda, profissionais, serviços e usuários da sua unidade.',
    OPERACIONAL: 'Agenda da unidade: criar, remarcar e cancelar atendimentos.',
};

export default function DashboardPage() {
    const {stats, uso, nome, perfil, iconeUso: IconeUso} = useDashboardController();
    const temAgenda = perfil === 'ADMIN' || perfil === 'OPERACIONAL';
    const [data, setData] = useState(hojeIso);
    const grade = useGradeDoDia(data, temAgenda);

    return (
        <div className="space-y-8">
            <PageHeader titulo={nome ? `Olá, ${nome.split(' ')[0]}` : 'Dashboard'}
                        subtitulo={DESCRICAO_PERFIL[perfil] ?? 'Bem-vindo ao MarkNow.'}/>

            {temAgenda && (
                <section className="cartao overflow-hidden">
                    <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                        <div className="flex items-center gap-2">
                            <button onClick={() => setData(d => somarDias(d, -1))} aria-label="Dia anterior" className="p-2 rounded-xl hover:bg-purple-50"><ChevronLeft size={18}/></button>
                            <h2 className="font-extrabold text-gray-900 first-letter:uppercase min-w-48 text-center">{dataLonga(data)}</h2>
                            <button onClick={() => setData(d => somarDias(d, 1))} aria-label="Próximo dia" className="p-2 rounded-xl hover:bg-purple-50"><ChevronRight size={18}/></button>
                            <button onClick={() => setData(hojeIso())} className="px-3 py-2 rounded-xl text-sm font-bold text-purple-600 hover:bg-purple-50">Hoje</button>
                        </div>
                        <Link href="/agendamento" className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-marca text-white text-sm font-bold hover:brightness-110 transition-all">
                            <CalendarClock size={16}/> Abrir a agenda
                        </Link>
                    </header>
                    {grade.carregando ? (
                        <div className="flex h-48 items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={32}/></div>
                    ) : grade.profissionais.length === 0 ? (
                        <p className="p-10 text-center text-sm text-gray-500">Cadastre um profissional ativo para ver os horários.</p>
                    ) : (
                        <GradeHorarios data={data} profissionais={grade.profissionais} agendamentos={grade.agendamentos}/>
                    )}
                </section>
            )}

            {stats.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label}
                             className="cartao p-6 hover:shadow-md transition-shadow">
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
                <div className="cartao p-6 space-y-3">
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
        </div>
    );
}
