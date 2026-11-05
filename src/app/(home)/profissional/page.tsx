'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {CalendarClock, Loader2, Pencil, Phone, Plus, UserCog} from 'lucide-react';
import {BOTAO_PRIMARIO} from "@/components/common/formStyles";
import {ProfissionalService} from "@/services/agenda.service";
import {DIAS_SEMANA, Disponibilidade, Profissional} from "@/types/agenda/agenda";
import {notify} from "@/utils/toast-service";
import {mensagemErro} from "@/utils/apiError";

const resumoDisponibilidade = (lista: Disponibilidade[]) => {
    const porDia = new Map<number, string[]>();
    lista.forEach(d => porDia.set(d.diaSemana, [...(porDia.get(d.diaSemana) ?? []), `${d.horaInicio.slice(0, 5)}–${d.horaFim.slice(0, 5)}`]));
    return [...porDia.entries()].map(([dia, faixas]) => `${DIAS_SEMANA[dia].slice(0, 3)} ${faixas.join(', ')}`);
};

export default function ProfissionalPage() {
    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ProfissionalService.listar()
            .then(setProfissionais)
            .catch(err => notify.error(mensagemErro(err, "Erro ao carregar profissionais.")))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Profissionais</h1>
                    <p className="text-sm text-gray-500 font-medium">Quem atende e em quais horários da semana.</p>
                </div>
                <Link href="/profissional/new" className={BOTAO_PRIMARIO}><Plus size={20}/> Novo Profissional</Link>
            </div>

            {loading ? (
                <div className="flex h-48 items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={32}/></div>
            ) : profissionais.length === 0 ? (
                <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-500">
                    Nenhum profissional cadastrado ainda.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {profissionais.map(p => (
                        <div key={p.oid} className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 ${p.ativo ? '' : 'opacity-50'}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex gap-4">
                                    <div className="p-3 h-fit rounded-2xl bg-purple-50 text-purple-600"><UserCog size={20}/></div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{p.nome}</h3>
                                        {p.telefone && (
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                <Phone size={12}/> ({p.dddTelefone}) {p.telefone}
                                            </p>
                                        )}
                                        {!p.ativo && <span className="text-[10px] font-bold uppercase text-gray-400">Inativo</span>}
                                    </div>
                                </div>
                                <Link href={`/profissional/${p.oid}`} title="Editar"
                                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                    <Pencil size={18}/>
                                </Link>
                            </div>
                            <div className="text-xs text-gray-500 space-y-1 border-t border-gray-50 pt-3">
                                {p.disponibilidades.length === 0 ? (
                                    <p className="flex items-center gap-1 text-amber-600"><CalendarClock size={12}/> Sem disponibilidade cadastrada</p>
                                ) : resumoDisponibilidade(p.disponibilidades).map(linha => <p key={linha}>{linha}</p>)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
