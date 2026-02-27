'use client';

import { useState } from 'react';
import {
    ArrowLeft, ArrowRight, Building2, User,
    MapPin, Lock, Mail, Loader2, CheckCircle2, Ticket
} from 'lucide-react';
import Link from 'next/link';
import { useRegisterController } from "./useRegisterController";

export default function RegisterPage() {
    const { step, nextStep, prevStep, loading, error, handleRegister, urlInviteCode } = useRegisterController();
    const [tipoPessoa, setTipoPessoa] = useState('PJ');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (step < 3) {
            nextStep();
        } else {
            handleRegister(formData);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="w-full max-w-[600px] bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">

                {/* Header com Stepper */}
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-black italic text-[#2D0066] uppercase tracking-tighter mb-4">
                        Mark<span className="text-purple-500">Now</span>
                    </h1>

                    <div className="flex items-center justify-center gap-2 mb-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-purple-600' : 'w-2 bg-gray-200'}`} />
                        ))}
                    </div>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">
                        {step === 1 && "Convite e Unidade"}
                        {step === 2 && "Endereço da Unidade"}
                        {step === 3 && "Dados do Administrador"}
                    </p>
                </header>

                <form onSubmit={onSubmit} className="space-y-6">

                    {/* PASSO 1: CONVITE E DADOS BÁSICOS PRESTADOR */}
                    {step === 1 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-purple-600 uppercase tracking-widest ml-1">Código de Convite</label>
                                <div className="relative">
                                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-300" />
                                    <input name="codigoInvite" required defaultValue={urlInviteCode} placeholder="CÓDIGO-MARKNOW"
                                           className="w-full pl-12 pr-4 py-4 bg-purple-50 border-none rounded-2xl outline-none text-sm font-bold uppercase" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" onClick={() => setTipoPessoa('PJ')} className={`p-4 rounded-2xl border-2 transition-all font-bold text-xs ${tipoPessoa === 'PJ' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-100 text-gray-400'}`}>PESSOA JURÍDICA</button>
                                <button type="button" onClick={() => setTipoPessoa('PF')} className={`p-4 rounded-2xl border-2 transition-all font-bold text-xs ${tipoPessoa === 'PF' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-100 text-gray-400'}`}>PESSOA FÍSICA</button>
                                <input type="hidden" name="tipoPessoa" value={tipoPessoa} />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome da Unidade / Empresa</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                                    <input name="prestadorNome" required placeholder="Ex: Barbearia do Mark" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{tipoPessoa === 'PJ' ? 'CNPJ' : 'CPF'}</label>
                                <input name="documento" required placeholder="00.000.000/0000-00" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
                            </div>
                        </div>
                    )}

                    {/* PASSO 2: ENDEREÇO */}
                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">CEP</label>
                                    <input name="cep" required placeholder="00000-000" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Cidade</label>
                                    <input name="cidade" required placeholder="Joinville" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                <div className="col-span-4 space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Logradouro</label>
                                    <input name="logradouro" required placeholder="Rua..." className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
                                </div>
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">UF</label>
                                    <input name="uf" required maxLength={2} placeholder="SC" className="w-full px-4 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-bold text-center" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Número</label>
                                    <input name="numero" required placeholder="123" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Bairro</label>
                                    <input name="bairro" required placeholder="Centro" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Complemento</label>
                                <input name="complemento" placeholder="Sala, bloco, etc..." className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
                            </div>
                        </div>
                    )}

                    {/* PASSO 3: ADMINISTRADOR */}
                    {step === 3 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Seu Nome Completo</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                                    <input name="adminNome" required placeholder="Como quer ser chamado?" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail de Acesso</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                                    <input name="adminEmail" type="email" required placeholder="admin@empresa.com" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Senha Mestra</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                                    <input name="adminSenha" type="password" required placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[11px] font-bold border border-red-100 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        {step > 1 && (
                            <button type="button" onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all text-sm">
                                Voltar
                            </button>
                        )}
                        <button type="submit" disabled={loading} className="flex-[2] py-4 bg-[#2D0066] text-white font-bold rounded-2xl hover:bg-purple-900 transition-all shadow-lg flex justify-center items-center gap-2 text-sm">
                            {loading ? <Loader2 className="animate-spin" /> : (
                                step === 3 ? "Finalizar Cadastro" : "Próximo Passo"
                            )}
                            {step < 3 && !loading && <ArrowRight size={18} />}
                        </button>
                    </div>

                    <p className="text-center text-[11px] font-medium text-gray-400">
                        Já tem uma conta? <Link href="/auth/login" className="text-purple-600 font-bold hover:underline">Fazer Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}