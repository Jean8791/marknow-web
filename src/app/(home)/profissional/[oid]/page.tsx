'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';
import {ArrowLeft, CalendarClock, Loader2, Plus, Save, Trash2, UserCog} from 'lucide-react';
import {BOTAO_PRIMARIO, INPUT, LABEL} from "@/components/common/formStyles";
import {ProfissionalService} from "@/services/agenda.service";
import {DIAS_SEMANA, Disponibilidade} from "@/types/agenda/agenda";
import {notify} from "@/utils/toast-service";
import {mensagemErro} from "@/utils/apiError";

const HORARIOS = Array.from({length: 48}, (_, i) => `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`);
const PADRAO: Disponibilidade[] = [1, 2, 3, 4, 5].flatMap(dia => [
    {diaSemana: dia, horaInicio: '08:00', horaFim: '12:00'},
    {diaSemana: dia, horaInicio: '14:00', horaFim: '18:00'},
]);

export default function ProfissionalFormPage() {
    const params = useParams();
    const router = useRouter();
    const oid = params?.oid && params.oid !== 'new' ? params.oid as string : null;

    const [loading, setLoading] = useState(!!oid);
    const [salvando, setSalvando] = useState(false);
    const [dados, setDados] = useState({nome: '', dddTelefone: '', telefone: '', ativo: true});
    const [janelas, setJanelas] = useState<Disponibilidade[]>(oid ? [] : PADRAO);

    useEffect(() => {
        if (!oid) return;
        ProfissionalService.buscar(oid)
            .then(p => {
                setDados({nome: p.nome, dddTelefone: p.dddTelefone ?? '', telefone: p.telefone ?? '', ativo: p.ativo});
                setJanelas(p.disponibilidades.map(d => ({...d, horaInicio: d.horaInicio.slice(0, 5), horaFim: d.horaFim.slice(0, 5)})));
            })
            .catch(err => {
                notify.error(mensagemErro(err, "Profissional não encontrado."));
                router.push('/profissional');
            })
            .finally(() => setLoading(false));
    }, [oid, router]);

    const alterarJanela = (indice: number, campo: keyof Disponibilidade, valor: string) =>
        setJanelas(atual => atual.map((j, i) => i === indice ? {...j, [campo]: campo === 'diaSemana' ? Number(valor) : valor} : j));

    const salvar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSalvando(true);
        try {
            await ProfissionalService.salvar({
                nome: dados.nome.trim(),
                dddTelefone: dados.dddTelefone.replace(/\D/g, ''),
                telefone: dados.telefone.replace(/\D/g, ''),
                ativo: dados.ativo,
                disponibilidades: janelas,
            }, oid);
            notify.success("Profissional salvo.");
            router.push('/profissional');
        } catch (err) {
            notify.error(mensagemErro(err, "Erro ao salvar profissional."));
        } finally {
            setSalvando(false);
        }
    };

    if (loading) return (
        <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={40}/></div>
    );

    return (
        <form onSubmit={salvar} className="max-w-5xl mx-auto space-y-6 pb-12">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/profissional" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20}/></Link>
                    <h1 className="text-xl font-bold text-gray-800">{oid ? 'Editar Profissional' : 'Novo Profissional'}</h1>
                </div>
                <button type="submit" disabled={salvando} className={BOTAO_PRIMARIO}>
                    {salvando ? <Loader2 className="animate-spin" size={20}/> : <Save size={20}/>} Salvar
                </button>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-purple-600 font-bold border-b border-gray-50 pb-4">
                    <UserCog size={20}/> <h2>Dados</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 space-y-1">
                        <label className={LABEL}>Nome</label>
                        <input value={dados.nome} onChange={e => setDados({...dados, nome: e.target.value})} required minLength={2} maxLength={120} className={INPUT}/>
                    </div>
                    <div className="space-y-1">
                        <label className={LABEL}>DDD</label>
                        <input value={dados.dddTelefone} onChange={e => setDados({...dados, dddTelefone: e.target.value})} maxLength={2} inputMode="numeric" className={INPUT}/>
                    </div>
                    <div className="space-y-1">
                        <label className={LABEL}>WhatsApp (opcional)</label>
                        <input value={dados.telefone} onChange={e => setDados({...dados, telefone: e.target.value})} inputMode="numeric" className={INPUT}/>
                    </div>
                    <div className="space-y-1">
                        <label className={LABEL}>Situação</label>
                        <select value={String(dados.ativo)} onChange={e => setDados({...dados, ativo: e.target.value === 'true'})} className={INPUT}>
                            <option value="true">Ativo</option>
                            <option value="false">Inativo</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div className="flex items-center gap-2 text-purple-600 font-bold">
                        <CalendarClock size={20}/> <h2>Disponibilidade semanal</h2>
                    </div>
                    <button type="button" onClick={() => setJanelas([...janelas, {diaSemana: 1, horaInicio: '08:00', horaFim: '12:00'}])}
                            className="text-sm font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1">
                        <Plus size={16}/> Adicionar janela
                    </button>
                </div>
                <p className="text-xs text-gray-500">Os horários vão de 30 em 30 minutos. Um serviço só pode ser agendado se couber inteiro dentro de uma janela.</p>

                {janelas.length === 0 ? (
                    <p className="text-sm text-amber-600">Sem janelas, o profissional não aparece com horários livres.</p>
                ) : (
                    <div className="space-y-3">
                        {janelas.map((j, i) => (
                            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center">
                                <select value={j.diaSemana} onChange={e => alterarJanela(i, 'diaSemana', e.target.value)} className={INPUT} aria-label="Dia da semana">
                                    {DIAS_SEMANA.slice(1).map((nome, idx) => <option key={nome} value={idx + 1}>{nome}</option>)}
                                </select>
                                <select value={j.horaInicio} onChange={e => alterarJanela(i, 'horaInicio', e.target.value)} className={INPUT} aria-label="Início">
                                    {HORARIOS.map(h => <option key={h} value={h}>{h}</option>)}
                                </select>
                                <select value={j.horaFim} onChange={e => alterarJanela(i, 'horaFim', e.target.value)} className={INPUT} aria-label="Fim">
                                    {HORARIOS.map(h => <option key={h} value={h}>{h}</option>)}
                                </select>
                                <button type="button" onClick={() => setJanelas(janelas.filter((_, idx) => idx !== i))} title="Remover janela"
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                    <Trash2 size={18}/>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </form>
    );
}
