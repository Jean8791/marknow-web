'use client';

import { useState } from 'react'; // Adicionado para controlar a visibilidade do flag
import { AlignLeft, Copy, Hash, Loader2, Mail, Ticket, ArrowLeft, Send } from 'lucide-react';
import { useConviteController } from "./useConviteController";
import Link from 'next/link';

export default function ConvitePage() {
    const { loading, invite, gerarConvite, copiarLink } = useConviteController();
    const [emailValue, setEmailValue] = useState('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        gerarConvite(formData);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Link
                    href="/convite"
                    className="flex items-center gap-2 text-gray-500 hover:text-[#2D0066] font-bold text-sm transition-colors group"
                >
                    <div className="p-2 rounded-xl bg-white border border-gray-100 group-hover:border-purple-200 shadow-sm">
                        <ArrowLeft size={18} />
                    </div>
                    Voltar para a lista
                </Link>
            </div>

            <header className="space-y-2">
                <h1 className="text-3xl font-black text-[#2D0066] uppercase tracking-tighter">
                    Gerar <span className="text-purple-500">Convite</span>
                </h1>
                <p className="text-gray-500 text-sm font-medium">Configure os parâmetros de acesso para o seu novo parceiro.</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[40px] border border-gray-100 shadow-sm">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Descrição do Convite</label>
                            <div className="relative">
                                <AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-300" />
                                <input name="descricao" required placeholder="Ex: Convite para Unidade Joinville" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-purple-100 focus:bg-white outline-none text-sm font-semibold transition-all" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail (Opcional)</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-300" />
                                    <input
                                        name="email"
                                        type="email"
                                        value={emailValue}
                                        onChange={(e) => setEmailValue(e.target.value)}
                                        placeholder="parceiro@email.com"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-purple-100 focus:bg-white outline-none text-sm font-semibold transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Máximo de Usos</label>
                                <div className="relative">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-300" />
                                    <input name="maxUsos" type="number" required defaultValue={1} min={1} className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-purple-100 focus:bg-white outline-none text-sm font-semibold transition-all" />
                                </div>
                            </div>
                        </div>

                        {/* --- NOVO: FLAG DE ENVIO DE E-MAIL --- */}
                        {emailValue.includes('@') && (
                            <div className="p-4 bg-purple-50 rounded-3xl border border-purple-100 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-xl text-purple-600 shadow-sm">
                                        <Send size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-purple-900">Enviar convite por e-mail?</p>
                                        <p className="text-[10px] text-purple-600 font-medium">O parceiro receberá o link automaticamente.</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input name="enviarEmail" type="checkbox" value="true" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                </label>
                            </div>
                        )}

                        <div className="pt-4">
                            <button type="submit" disabled={loading} className="w-full py-4 bg-[#2D0066] text-white font-bold rounded-2xl hover:bg-purple-900 transition-all flex justify-center items-center gap-2 disabled:opacity-50 shadow-xl shadow-purple-100 active:scale-[0.98]">
                                {loading ? <Loader2 className="animate-spin" /> : <>Confirmar e Gerar Convite <Ticket size={18} /></>}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-5 h-full">
                    {/* ... Restante do código do card de convite gerado ... */}
                    {invite ? (
                        <div className="bg-[#2D0066] p-10 rounded-[40px] text-white h-full flex flex-col justify-between relative overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-500">
                            {/* ... (mesmo conteúdo do card anterior) */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
                            <div className="relative">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                                        <Ticket size={24} className="text-purple-300" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                                        Ativo para uso
                                    </span>
                                </div>
                                <div className="space-y-2 mb-8">
                                    <p className="text-[10px] uppercase font-bold opacity-50 tracking-widest">Código Gerado</p>
                                    <h3 className="text-5xl font-mono font-bold tracking-[0.1em] text-white">{invite.codigo}</h3>
                                </div>
                            </div>
                            <div className="relative space-y-6">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                                    <div className="flex justify-between text-[11px] font-medium opacity-70">
                                        <span>Expiração</span>
                                        <span>{new Date(invite.expiraEm).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-medium opacity-70">
                                        <span>Limite de usos</span>
                                        <span>{invite.maxUsos} {invite.maxUsos === 1 ? 'vaga' : 'vagas'}</span>
                                    </div>
                                </div>
                                <button onClick={() => copiarLink(invite.codigo)} className="w-full py-5 bg-white text-[#2D0066] font-extrabold rounded-2xl flex items-center justify-center gap-3 hover:bg-purple-50 transition-all active:scale-95 shadow-lg">
                                    <Copy size={20} /> Copiar Link de Cadastro
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] border-4 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center p-12 text-center space-y-6 text-gray-300 group hover:border-purple-100 transition-colors">
                            <div className="p-6 bg-gray-50 rounded-full group-hover:bg-purple-50 transition-colors">
                                <Ticket size={64} className="opacity-20 group-hover:opacity-40 transition-opacity" />
                            </div>
                            <div className="max-w-[200px] space-y-2">
                                <p className="text-lg font-bold text-gray-400">Aguardando dados</p>
                                <p className="text-sm font-medium opacity-60">O seu convite aparecerá aqui após o preenchimento.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}