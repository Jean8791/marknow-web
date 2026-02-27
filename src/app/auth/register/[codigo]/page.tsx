'use client';

import {ArrowLeft, ArrowRight, Building2, Loader2, Lock, Mail, Ticket, User} from 'lucide-react';
import {useRegisterController} from "./useRegisterController";
import Link from 'next/link';

export default function RegisterPage() {
    const {
        step, nextStep, prevStep, loading, error,
        handleRegister, urlInviteCode, handleCepBlur,
        address, setAddress, tipoPessoa, setTipoPessoa
    } = useRegisterController();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (step < 3) {
            nextStep(formData);
        } else {
            handleRegister(formData);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans text-gray-900">
            <div className="w-full max-w-[600px] bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">

                <header className="text-center mb-8">
                    {/* Botão de Voltar ao Login - Visível apenas no Passo 1 */}
                    {step === 1 && (
                        <Link href="/auth/login"
                              className="inline-flex items-center text-xs font-bold text-purple-600 hover:text-purple-800 transition-all mb-6 uppercase tracking-widest gap-2 group">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Voltar ao
                            Login
                        </Link>
                    )}

                    <h1 className="text-3xl font-black italic text-[#2D0066] uppercase tracking-tighter mb-4">
                        Mark<span className="text-purple-500">Now</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i}
                                 className={`h-2 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-purple-600' : 'w-2 bg-gray-200'}`}/>
                        ))}
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* PASSO 1 */}
                    <div className={`space-y-5 animate-in fade-in duration-300 ${step !== 1 ? 'hidden' : 'block'}`}>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-purple-600 uppercase tracking-widest ml-1">Código
                                de Convite</label>
                            <div className="relative">
                                <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-300"/>
                                <input name="codigoInvite" defaultValue={urlInviteCode} placeholder="CÓDIGO-MARKNOW"
                                       className="w-full pl-12 pr-4 py-4 bg-purple-50 border-none rounded-2xl outline-none text-sm font-bold uppercase"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" onClick={() => setTipoPessoa('PJ')}
                                    className={`p-4 rounded-2xl border-2 transition-all font-bold text-xs ${tipoPessoa === 'PJ' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-100 text-gray-400'}`}>
                                PESSOA JURÍDICA
                            </button>
                            <button type="button" onClick={() => setTipoPessoa('PF')}
                                    className={`p-4 rounded-2xl border-2 transition-all font-bold text-xs ${tipoPessoa === 'PF' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-100 text-gray-400'}`}>
                                PESSOA FÍSICA
                            </button>
                            <input type="hidden" name="tipoPessoa" value={tipoPessoa}/>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome
                                da Unidade</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300"/>
                                <input name="prestadorNome" placeholder="Ex: Clínica Saúde"
                                       className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold"/>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label
                                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{tipoPessoa === 'PJ' ? 'CNPJ' : 'CPF'}</label>
                            <input name="documento" placeholder="Apenas números"
                                   className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold"/>
                        </div>
                    </div>

                    {/* PASSO 2 */}
                    <div className={`space-y-4 animate-in fade-in duration-300 ${step !== 2 ? 'hidden' : 'block'}`}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label
                                    className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">CEP</label>
                                <input
                                    name="cep"
                                    placeholder="00000-000"
                                    value={address.cep}
                                    onChange={(e) => setAddress({...address, cep: e.target.value})}
                                    onBlur={(e) => handleCepBlur(e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold border-2 border-transparent focus:border-purple-100 transition-all"
                                />
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Cidade</label>
                                <input
                                    name="cidade"
                                    value={address.cidade}
                                    readOnly
                                    className="w-full px-5 py-4 bg-gray-100 rounded-2xl outline-none text-sm font-semibold text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-4">
                            <div className="col-span-4 space-y-1">
                                <label
                                    className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Logradouro</label>
                                <input
                                    name="logradouro"
                                    value={address.logradouro}
                                    onChange={(e) => setAddress({...address, logradouro: e.target.value})}
                                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold"
                                />
                            </div>
                            <div className="col-span-1 space-y-1">
                                <label
                                    className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">UF</label>
                                <input
                                    name="uf"
                                    value={address.uf}
                                    readOnly
                                    className="w-full px-4 py-4 bg-gray-100 rounded-2xl outline-none text-sm font-bold text-center text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1 space-y-1">
                                <label
                                    className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Número</label>
                                <input name="numero" placeholder="123"
                                       className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold"/>
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label
                                    className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Bairro</label>
                                <input
                                    name="bairro"
                                    value={address.bairro}
                                    onChange={(e) => setAddress({...address, bairro: e.target.value})}
                                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label
                                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Complemento</label>
                            <input name="complemento" placeholder="Opcional"
                                   className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold"/>
                        </div>
                    </div>

                    {/* PASSO 3 */}
                    <div className={`space-y-5 animate-in fade-in duration-300 ${step !== 3 ? 'hidden' : 'block'}`}>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome
                                Completo</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300"/>
                                <input name="adminNome"
                                       className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold"/>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label
                                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300"/>
                                <input name="adminEmail" type="email"
                                       className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold"/>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label
                                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300"/>
                                <input name="adminSenha" type="password"
                                       className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-semibold"/>
                            </div>
                        </div>
                    </div>

                    {error && <div
                        className="p-3 bg-red-50 text-red-600 rounded-xl text-[11px] font-bold border border-red-100">{error}</div>}

                    <div className="flex gap-3 pt-4">
                        {step > 1 && (
                            <button type="button" onClick={prevStep}
                                    className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all text-sm">
                                Voltar
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] py-4 bg-[#2D0066] text-white font-bold rounded-2xl hover:bg-purple-900 transition-all shadow-lg flex justify-center items-center gap-2 text-sm active:scale-[0.98]"
                        >
                            {loading ? <Loader2
                                className="animate-spin"/> : (step === 3 ? "Finalizar Cadastro" : "Próximo Passo")}
                            {step < 3 && !loading && <ArrowRight size={18}/>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}