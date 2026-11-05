'use client';

import React, {useEffect, useState} from 'react';
import {Loader2} from 'lucide-react';
import Modal from "@/components/common/Modal";
import {BOTAO_PRIMARIO, BOTAO_SECUNDARIO, INPUT, LABEL} from "@/components/common/formStyles";
import {AgendamentoService} from "@/services/agenda.service";
import {Agendamento, Profissional, Servico} from "@/types/agenda/agenda";
import {notify} from "@/utils/toast-service";
import {mensagemErro} from "@/utils/apiError";
import {hojeIso} from "@/utils/agenda";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSalvo: (data: string) => void;
    profissionais: Profissional[];
    servicos: Servico[];
    dataInicial: string;
    profissionalInicial?: string;
    remarcando?: Agendamento | null;
}

export default function AgendamentoModal({
                                             isOpen, onClose, onSalvo, profissionais, servicos,
                                             dataInicial, profissionalInicial, remarcando
                                         }: Props) {
    const [oidProfissional, setOidProfissional] = useState(remarcando?.oidProfissional ?? profissionalInicial ?? profissionais[0]?.oid ?? '');
    const [oidServico, setOidServico] = useState(remarcando?.oidServico ?? servicos[0]?.oid ?? '');
    const [data, setData] = useState(remarcando ? remarcando.inicio.slice(0, 10) : dataInicial);
    const [resultado, setResultado] = useState<{ chave: string; horarios: string[] } | null>(null);
    const [selecao, setSelecao] = useState<{ chave: string; horario: string } | null>(null);
    const [salvando, setSalvando] = useState(false);

    const chave = `${oidProfissional}|${oidServico}|${data}`;
    const consultaValida = !!(oidProfissional && oidServico && data);
    const carregandoHorarios = consultaValida && resultado?.chave !== chave;
    const horarios = resultado?.chave === chave ? resultado.horarios : [];
    const horario = selecao?.chave === chave ? selecao.horario : '';

    useEffect(() => {
        if (!consultaValida) return;
        let ativo = true;
        AgendamentoService.horariosLivres(oidProfissional, oidServico, data, remarcando?.oid)
            .then(lista => ativo && setResultado({chave, horarios: lista}))
            .catch(err => {
                if (!ativo) return;
                setResultado({chave, horarios: []});
                notify.error(mensagemErro(err, "Erro ao buscar horários."));
            });
        return () => {
            ativo = false;
        };
    }, [chave, consultaValida, oidProfissional, oidServico, data, remarcando]);

    const salvar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!horario) {
            notify.error("Escolha um horário livre.");
            return;
        }
        const form = new FormData(e.currentTarget);
        const inicio = `${data}T${horario}`;
        setSalvando(true);
        try {
            if (remarcando) {
                await AgendamentoService.remarcar(remarcando.oid, inicio, oidProfissional);
                notify.success("Agendamento remarcado. Avise o cliente pelo WhatsApp.");
            } else {
                await AgendamentoService.criar({
                    oidProfissional,
                    oidServico,
                    inicio,
                    clienteNome: (form.get('clienteNome') as string).trim(),
                    clienteDdd: (form.get('clienteDdd') as string).replace(/\D/g, ''),
                    clienteTelefone: (form.get('clienteTelefone') as string).replace(/\D/g, ''),
                    observacao: (form.get('observacao') as string)?.trim() || undefined,
                });
                notify.success("Agendamento criado.");
            }
            onSalvo(data);
        } catch (err) {
            notify.error(mensagemErro(err, "Não foi possível salvar o agendamento."));
        } finally {
            setSalvando(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} largura="lg"
               title={remarcando ? `Remarcar ${remarcando.clienteNome}` : 'Novo Agendamento'}>
            <form onSubmit={salvar} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className={LABEL}>Profissional</label>
                        <select value={oidProfissional} onChange={e => setOidProfissional(e.target.value)} required className={INPUT}>
                            {profissionais.map(p => <option key={p.oid} value={p.oid}>{p.nome}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className={LABEL}>Serviço</label>
                        <select value={oidServico} onChange={e => setOidServico(e.target.value)} required disabled={!!remarcando} className={INPUT}>
                            {servicos.map(s => <option key={s.oid} value={s.oid}>{s.nome} ({s.duracaoMinutos} min)</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className={LABEL}>Data</label>
                        <input type="date" value={data} min={hojeIso()} onChange={e => setData(e.target.value)} required className={INPUT}/>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className={LABEL}>Horários livres</label>
                    {carregandoHorarios ? (
                        <div className="flex h-16 items-center justify-center"><Loader2 className="animate-spin text-purple-600"/></div>
                    ) : horarios.length === 0 ? (
                        <p className="text-sm text-gray-500 bg-gray-50 rounded-2xl p-4">
                            Nenhum horário livre para essa combinação. Confira a disponibilidade do profissional ou escolha outra data.
                        </p>
                    ) : (
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                            {horarios.map(h => (
                                <button type="button" key={h} onClick={() => setSelecao({chave, horario: h})}
                                        className={`py-2 rounded-xl text-sm font-bold border-2 transition-all ${horario === h ? 'border-purple-600 bg-purple-600 text-white' : 'border-gray-100 text-gray-600 hover:border-purple-200'}`}>
                                    {h}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {!remarcando && (
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_80px_1fr] gap-4">
                        <div className="space-y-1">
                            <label className={LABEL}>Cliente</label>
                            <input name="clienteNome" required minLength={2} maxLength={120} className={INPUT}/>
                        </div>
                        <div className="space-y-1">
                            <label className={LABEL}>DDD</label>
                            <input name="clienteDdd" required pattern="\d{2}" maxLength={2} inputMode="numeric" className={INPUT}/>
                        </div>
                        <div className="space-y-1">
                            <label className={LABEL}>WhatsApp</label>
                            <input name="clienteTelefone" required pattern="[\d\s-]{8,11}" inputMode="numeric" placeholder="99999-9999" className={INPUT}/>
                        </div>
                        <div className="md:col-span-3 space-y-1">
                            <label className={LABEL}>Observação (opcional)</label>
                            <input name="observacao" maxLength={500} className={INPUT}/>
                        </div>
                    </div>
                )}

                <div className="flex gap-3 pt-2">
                    <button type="button" onClick={onClose} className={`flex-1 ${BOTAO_SECUNDARIO}`}>Fechar</button>
                    <button type="submit" disabled={salvando || !horario} className={`flex-1 ${BOTAO_PRIMARIO}`}>
                        {salvando && <Loader2 className="animate-spin" size={18}/>}
                        {remarcando ? 'Remarcar' : 'Agendar'}{horario ? ` às ${horario}` : ''}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
