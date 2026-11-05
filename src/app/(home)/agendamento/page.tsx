'use client';

import {useCallback, useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import {AlertTriangle, CalendarClock, ChevronLeft, ChevronRight, Loader2, MessageCircle, Phone, Plus, Send, X} from 'lucide-react';
import ConfirmModal from "@/components/common/ConfirmModal";
import {BOTAO_PRIMARIO} from "@/components/common/formStyles";

const FILTRO = "p-2.5 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-semibold text-sm";
import AgendamentoModal from "@/app/(home)/agendamento/AgendamentoModal";
import {AgendamentoService, ProfissionalService, ServicoService} from "@/services/agenda.service";
import {Agendamento, Profissional, Servico, UsoAgendamentos} from "@/types/agenda/agenda";
import {notify} from "@/utils/toast-service";
import {mensagemErro} from "@/utils/apiError";
import {dataLonga, diaSemanaIso, hojeIso, hora, somarDias, whatsappCliente, whatsappProfissional} from "@/utils/agenda";

export default function AgendaPage() {
    const [data, setData] = useState(hojeIso);
    const [filtro, setFiltro] = useState('');
    const [mostrarCancelados, setMostrarCancelados] = useState(false);
    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [uso, setUso] = useState<UsoAgendamentos | null>(null);
    const [loading, setLoading] = useState(true);
    const [perfil, setPerfil] = useState('');
    const [modal, setModal] = useState<{ aberto: boolean; remarcando?: Agendamento | null; profissional?: string }>({aberto: false});
    const [cancelando, setCancelando] = useState<Agendamento | null>(null);
    const [processando, setProcessando] = useState(false);

    useEffect(() => {
        const handle = requestAnimationFrame(() => setPerfil(localStorage.getItem('@MarkNow:user-role') || ''));
        Promise.all([ProfissionalService.listar(true), ServicoService.listar(true)])
            .then(([p, s]) => {
                setProfissionais(p);
                setServicos(s);
            })
            .catch(err => notify.error(mensagemErro(err, "Erro ao carregar profissionais e serviços.")));
        return () => cancelAnimationFrame(handle);
    }, []);

    const carregar = useCallback(async () => {
        try {
            const [lista, usoAtual] = await Promise.all([AgendamentoService.listar(data), AgendamentoService.uso()]);
            setAgendamentos(lista);
            setUso(usoAtual);
        } catch (err) {
            notify.error(mensagemErro(err, "Erro ao carregar a agenda."));
        } finally {
            setLoading(false);
        }
    }, [data]);

    useEffect(() => {
        carregar();
    }, [carregar]);

    const colunas = useMemo(() => {
        const dia = diaSemanaIso(data);
        return profissionais
            .filter(p => !filtro || p.oid === filtro)
            .map(p => ({
                profissional: p,
                atendeNoDia: p.disponibilidades.some(d => d.diaSemana === dia),
                itens: agendamentos.filter(a => a.oidProfissional === p.oid && (mostrarCancelados || a.status === 'AGENDADO')),
            }));
    }, [profissionais, agendamentos, filtro, mostrarCancelados, data]);

    const enviarWhatsapp = async (a: Agendamento) => {
        window.open(whatsappCliente(a), '_blank', 'noopener,noreferrer');
        try {
            const atualizado = await AgendamentoService.whatsappEnviado(a.oid);
            setAgendamentos(lista => lista.map(x => x.oid === a.oid ? atualizado : x));
        } catch (err) {
            notify.error(mensagemErro(err, "Não foi possível registrar o envio."));
        }
    };

    const confirmarCancelamento = async () => {
        if (!cancelando) return;
        setProcessando(true);
        try {
            await AgendamentoService.cancelar(cancelando.oid);
            notify.success("Agendamento cancelado. Avise o cliente pelo WhatsApp.");
            setCancelando(null);
            setMostrarCancelados(true);
            await carregar();
        } catch (err) {
            notify.error(mensagemErro(err, "Erro ao cancelar."));
        } finally {
            setProcessando(false);
        }
    };

    const semCadastro = !loading && (profissionais.length === 0 || servicos.length === 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-end gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Agenda</h1>
                    <p className="text-sm text-gray-500 font-medium first-letter:uppercase">{dataLonga(data)}</p>
                </div>
                <button onClick={() => setModal({aberto: true})} disabled={semCadastro || uso?.bloqueado} className={BOTAO_PRIMARIO}>
                    <Plus size={20}/> Novo Agendamento
                </button>
            </div>

            {uso?.alerta && (
                <div className={`flex items-center gap-3 p-4 rounded-2xl text-sm font-semibold ${uso.bloqueado ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                    <AlertTriangle size={18}/>
                    {uso.bloqueado
                        ? `Limite do plano atingido: ${uso.usados} de ${uso.limite} agendamentos neste mês. Novos agendamentos estão bloqueados.`
                        : `Atenção: ${uso.usados} de ${uso.limite} agendamentos do plano já usados neste mês (${uso.percentual}%).`}
                </div>
            )}

            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                    <button onClick={() => setData(d => somarDias(d, -1))} aria-label="Dia anterior" className="p-2 rounded-xl hover:bg-gray-100"><ChevronLeft size={18}/></button>
                    <input type="date" value={data} onChange={e => e.target.value && setData(e.target.value)} className={FILTRO}/>
                    <button onClick={() => setData(d => somarDias(d, 1))} aria-label="Próximo dia" className="p-2 rounded-xl hover:bg-gray-100"><ChevronRight size={18}/></button>
                    <button onClick={() => setData(hojeIso())} className="px-3 py-2 rounded-xl text-sm font-bold text-purple-600 hover:bg-purple-50">Hoje</button>
                </div>
                <select value={filtro} onChange={e => setFiltro(e.target.value)} className={FILTRO} aria-label="Filtrar profissional">
                    <option value="">Todos os profissionais</option>
                    {profissionais.map(p => <option key={p.oid} value={p.oid}>{p.nome}</option>)}
                </select>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 ml-auto">
                    <input type="checkbox" checked={mostrarCancelados} onChange={e => setMostrarCancelados(e.target.checked)} className="accent-purple-600"/>
                    Mostrar cancelados
                </label>
            </div>

            {loading ? (
                <div className="flex h-48 items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={32}/></div>
            ) : semCadastro ? (
                <div className="bg-white rounded-3xl border border-dashed border-purple-200 p-10 flex flex-col items-center text-center gap-3">
                    <CalendarClock size={32} className="text-purple-600"/>
                    <h2 className="font-bold text-gray-800">Falta configurar a agenda</h2>
                    <p className="text-sm text-gray-500 max-w-md">
                        Cadastre pelo menos um profissional (com disponibilidade) e um serviço ativo para começar a agendar.
                    </p>
                    {perfil === 'ADMIN' && (
                        <div className="flex gap-3">
                            <Link href="/profissional" className="text-sm font-bold text-purple-600">Profissionais</Link>
                            <Link href="/servico" className="text-sm font-bold text-purple-600">Serviços</Link>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {colunas.map(({profissional, atendeNoDia, itens}) => (
                        <section key={profissional.oid} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 space-y-3">
                            <header className="flex items-center justify-between">
                                <h2 className="font-bold text-gray-800">{profissional.nome}</h2>
                                <button onClick={() => setModal({aberto: true, profissional: profissional.oid})} disabled={uso?.bloqueado}
                                        title="Agendar com este profissional" className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50 disabled:opacity-40">
                                    <Plus size={16}/>
                                </button>
                            </header>
                            {!atendeNoDia && <p className="text-xs text-gray-400">Não atende neste dia da semana.</p>}
                            {atendeNoDia && itens.length === 0 && <p className="text-xs text-gray-400">Nenhum agendamento.</p>}
                            {itens.map(a => (
                                <article key={a.oid} className={`rounded-2xl border p-3 space-y-2 ${a.status === 'CANCELADO' ? 'border-gray-100 bg-gray-50 opacity-60' : 'border-purple-100 bg-purple-50/40'}`}>
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-sm font-black text-[#2D0066]">{hora(a.inicio)} – {hora(a.fim)}</p>
                                            <p className="text-sm font-bold text-gray-800">{a.clienteNome}</p>
                                            <p className="text-xs text-gray-500">{a.servicoNome}</p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1"><Phone size={11}/> ({a.clienteDdd}) {a.clienteTelefone}</p>
                                            {a.observacao && <p className="text-xs text-gray-400 italic mt-1">{a.observacao}</p>}
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            {a.status === 'CANCELADO' && <span className="text-[10px] font-bold uppercase text-red-500">Cancelado</span>}
                                            <span className={`text-[10px] font-bold uppercase ${a.whatsappStatus === 'ENVIADO_MANUAL' ? 'text-green-600' : 'text-gray-400'}`}>
                                                {a.whatsappStatus === 'ENVIADO_MANUAL' ? 'Avisado' : 'Não avisado'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        <button onClick={() => enviarWhatsapp(a)} title="Enviar WhatsApp ao cliente"
                                                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-green-700 hover:bg-green-50">
                                            <MessageCircle size={14}/> Cliente
                                        </button>
                                        {profissional.telefone && profissional.dddTelefone && (
                                            <a href={whatsappProfissional(a, profissional.dddTelefone, profissional.telefone)} target="_blank" rel="noopener noreferrer"
                                               title="Avisar o profissional" className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">
                                                <Send size={14}/> Profissional
                                            </a>
                                        )}
                                        {a.status === 'AGENDADO' && (
                                            <>
                                                <button onClick={() => setModal({aberto: true, remarcando: a})}
                                                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-blue-700 hover:bg-blue-50">
                                                    <CalendarClock size={14}/> Remarcar
                                                </button>
                                                <button onClick={() => setCancelando(a)}
                                                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50">
                                                    <X size={14}/> Cancelar
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </section>
                    ))}
                </div>
            )}

            {modal.aberto && <AgendamentoModal
                isOpen
                onClose={() => setModal({aberto: false})}
                onSalvo={(novaData) => {
                    setModal({aberto: false});
                    if (novaData !== data) setData(novaData);
                    else carregar();
                }}
                profissionais={profissionais}
                servicos={servicos}
                dataInicial={data < hojeIso() ? hojeIso() : data}
                profissionalInicial={modal.profissional ?? (filtro || undefined)}
                remarcando={modal.remarcando}
            />}

            <ConfirmModal
                isOpen={!!cancelando}
                onClose={() => setCancelando(null)}
                onConfirm={confirmarCancelamento}
                title="Cancelar agendamento"
                message={cancelando ? `Cancelar ${cancelando.clienteNome} às ${hora(cancelando.inicio)}? O horário volta a ficar livre.` : ''}
                confirmText="Cancelar agendamento"
                cancelText="Voltar"
                variant="danger"
                isLoading={processando}
            />
        </div>
    );
}
