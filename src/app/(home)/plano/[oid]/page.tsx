'use client';

import {Activity, ArrowLeft, CalendarClock, DollarSign, Hash, Loader2, Save, Ticket} from 'lucide-react';
import Link from 'next/link';
import {usePlanoFormController} from "@/app/(home)/plano/[oid]/usePlanoFormController";

export default function PlanoFormPage() {
    const {plano, loading, isSaving, handleSave, oid} = usePlanoFormController();

    if (loading) return (
        <div className="flex h-96 items-center justify-center">
            <Loader2 className="animate-spin text-purple-600" size={40}/>
        </div>
    );

    return (
        <form onSubmit={handleSave} className="max-w-7xl mx-auto space-y-6 pb-12">
            {/* Top Bar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/plano" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20}/></Link>
                    <h1 className="text-xl font-bold text-gray-800">{oid ? 'Editar Plano' : 'Novo Plano'}</h1>
                </div>
            {/* Salvar */}
                <button type="submit" disabled={isSaving} className="bg-[#2D0066] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-900 transition-all shadow-lg disabled:opacity-50">{isSaving ? <Loader2 className="animate-spin" size={20}/> : <Save size={20}/>}Salvar Plano</button>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center gap-2 text-purple-600 font-bold border-b border-gray-50 pb-4">
                    <Ticket size={20}/> <h2>Configurações do Plano</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nome do Plano */}
                    <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome do Plano</label>
                        <input name="nome" defaultValue={plano?.nome} required placeholder="Ex: Plano Premium" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 font-semibold transition-all"/>
                    </div>

                    {/* Valor */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Valor Mensal</label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={18}/>
                            <input name="valor" type="number" step="0.01" defaultValue={plano?.valor} required placeholder="0,00" className="w-full pl-12 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 font-bold transition-all"/>
                        </div>
                    </div>

                    {/* Limite de Agendamentos */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Limite de Agendamentos</label>
                        <div className="relative">
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={18}/>
                            <input name="limiteAgendamentos" type="number" defaultValue={plano?.limiteAgendamentos} required placeholder="Ex: 500" className="w-full pl-12 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 font-bold transition-all"/>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Status do Plano</label>
                        <div className="relative">
                            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={18}/>
                            <select name="status" defaultValue={plano?.status} className="w-full pl-12 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 font-bold appearance-none transition-all">
                                <option value="ATIVO">Ativo</option>
                                <option value="INATIVO">Inativo</option>
                            </select>
                        </div>
                    </div>

                    {/* Possui Trial */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Período de Teste (Trial)</label>
                        <select name="possuiTrial" defaultValue={String(plano?.possuiTrial)} className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 font-bold transition-all">
                            <option value="false">Não possui</option>
                            <option value="true">Possui Trial</option>
                        </select>
                    </div>

                    {/* Dias Trial */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Dias de Trial</label>
                        <div className="relative">
                            <CalendarClock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={18}/>
                            <input name="diasTrial" type="number" defaultValue={plano?.diasTrial} placeholder="Ex: 7" className="w-full pl-12 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 font-bold transition-all"/>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}