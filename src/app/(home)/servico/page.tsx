'use client';

import React, {useCallback, useEffect, useState} from 'react';
import {Clock, Loader2, Pencil, Plus, Scissors} from 'lucide-react';
import Modal from "@/components/common/Modal";
import {BOTAO_PRIMARIO, BOTAO_SECUNDARIO, INPUT, LABEL} from "@/components/common/formStyles";
import {ServicoService} from "@/services/agenda.service";
import {Servico} from "@/types/agenda/agenda";
import {notify} from "@/utils/toast-service";
import {mensagemErro} from "@/utils/apiError";

const DURACOES = Array.from({length: 16}, (_, i) => (i + 1) * 30);

const formatarDuracao = (minutos: number) => {
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return [h ? `${h}h` : '', m ? `${m}min` : ''].filter(Boolean).join(' ');
};

const formatarValor = (valor?: number | null) =>
    valor == null ? '—' : Number(valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

export default function ServicoPage() {
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState<Partial<Servico> | null>(null);
    const [salvando, setSalvando] = useState(false);

    const carregar = useCallback(async () => {
        try {
            setServicos(await ServicoService.listar());
        } catch (err) {
            notify.error(mensagemErro(err, "Erro ao carregar serviços."));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        carregar();
    }, [carregar]);

    const salvar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const valor = (form.get('valor') as string).replace(',', '.');
        setSalvando(true);
        try {
            await ServicoService.salvar({
                nome: (form.get('nome') as string).trim(),
                duracaoMinutos: Number(form.get('duracaoMinutos')),
                valor: valor ? Number(valor) : null,
                ativo: form.get('ativo') === 'true',
            }, editando?.oid);
            notify.success("Serviço salvo.");
            setEditando(null);
            await carregar();
        } catch (err) {
            notify.error(mensagemErro(err, "Erro ao salvar serviço."));
        } finally {
            setSalvando(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Serviços</h1>
                    <p className="text-sm text-gray-500 font-medium">O que a unidade oferece e quanto tempo cada atendimento ocupa na agenda.</p>
                </div>
                <button onClick={() => setEditando({duracaoMinutos: 30, ativo: true})} className={BOTAO_PRIMARIO}>
                    <Plus size={20}/> Novo Serviço
                </button>
            </div>

            {loading ? (
                <div className="flex h-48 items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={32}/></div>
            ) : servicos.length === 0 ? (
                <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-500">
                    Nenhum serviço cadastrado ainda.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {servicos.map(s => (
                        <div key={s.oid} className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start justify-between gap-4 ${s.ativo ? '' : 'opacity-50'}`}>
                            <div className="flex gap-4">
                                <div className="p-3 h-fit rounded-2xl bg-purple-50 text-purple-600"><Scissors size={20}/></div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{s.nome}</h3>
                                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                        <Clock size={12}/> {formatarDuracao(s.duracaoMinutos)} · {formatarValor(s.valor)}
                                    </p>
                                    {!s.ativo && <span className="text-[10px] font-bold uppercase text-gray-400">Inativo</span>}
                                </div>
                            </div>
                            <button onClick={() => setEditando(s)} title="Editar"
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                <Pencil size={18}/>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={!!editando} onClose={() => setEditando(null)} title={editando?.oid ? 'Editar Serviço' : 'Novo Serviço'}>
                {editando && (
                    <form onSubmit={salvar} className="space-y-4">
                        <div className="space-y-1">
                            <label className={LABEL}>Nome</label>
                            <input name="nome" defaultValue={editando.nome} required minLength={2} maxLength={120} className={INPUT}/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className={LABEL}>Duração</label>
                                <select name="duracaoMinutos" defaultValue={editando.duracaoMinutos} className={INPUT}>
                                    {DURACOES.map(d => <option key={d} value={d}>{formatarDuracao(d)}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className={LABEL}>Valor (opcional)</label>
                                <input name="valor" defaultValue={editando.valor ?? ''} inputMode="decimal" placeholder="0,00" className={INPUT}/>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className={LABEL}>Situação</label>
                            <select name="ativo" defaultValue={String(editando.ativo ?? true)} className={INPUT}>
                                <option value="true">Ativo</option>
                                <option value="false">Inativo (não aparece para novos agendamentos)</option>
                            </select>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button type="button" onClick={() => setEditando(null)} className={`flex-1 ${BOTAO_SECUNDARIO}`}>Cancelar</button>
                            <button type="submit" disabled={salvando} className={`flex-1 ${BOTAO_PRIMARIO}`}>
                                {salvando && <Loader2 className="animate-spin" size={18}/>} Salvar
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}
