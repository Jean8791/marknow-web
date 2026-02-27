'use client';

import {useState} from 'react';
import {ArrowLeft, Eye, EyeOff, Key, Loader2, Lock, Mail} from 'lucide-react';
import Link from 'next/link';
import {useForgotPasswordController} from "./useForgotPasswordController";

export default function ForgotPasswordPage() {
    const {loading, error, step, handleSendCode, handleResetPassword} = useForgotPasswordController();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (step === 1) {
            handleSendCode(formData.get('email') as string);
        } else {
            handleResetPassword(formData);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="w-full max-w-[440px] bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">

                {/* Cabeçalho */}
                <header className="text-center mb-10">
                    <Link href="/auth/login"
                          className="inline-flex items-center text-xs font-bold text-purple-600 hover:text-purple-800 transition-all mb-6 uppercase tracking-widest gap-2">
                        <ArrowLeft size={14}/> Voltar ao Login
                    </Link>
                    <h1 className="text-3xl font-black italic text-[#2D0066] tracking-tighter uppercase mb-2 text-center">
                        Recuperar <span className="text-purple-500">Senha</span>
                    </h1>
                    <p className="text-gray-500 font-medium text-sm px-4">
                        {step === 1 ? "Informe seu e-mail para receber o código de verificação." : "Insira o código enviado e sua nova senha abaixo."}
                    </p>
                </header>

                <form onSubmit={onSubmit} className="space-y-5">

                    {/* CAMPO: E-MAIL */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-200"/>
                            <input
                                name="email"
                                type="email"
                                required
                                disabled={step === 2}
                                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none transition-all text-sm font-semibold ${step === 2 ? 'opacity-60 cursor-not-allowed' : 'focus:bg-white focus:border-purple-100 focus:ring-4 focus:ring-purple-50'}`}
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>

                    {step === 2 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-top-4 duration-500">
                            {/* CAMPO: CÓDIGO */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 text-purple-600">Código de Verificação</label>
                                <div className="relative">
                                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-300"/>
                                    <input
                                        name="codigo"
                                        type="text"
                                        required
                                        placeholder="000 000"
                                        className="w-full pl-12 pr-4 py-4 bg-purple-50 border-2 border-purple-100 rounded-2xl outline-none focus:bg-white focus:border-purple-300 focus:ring-4 focus:ring-purple-50 transition-all text-sm font-bold tracking-[0.5em] placeholder:tracking-normal placeholder:font-medium"
                                    />
                                </div>
                            </div>

                            {/* CAMPO: NOVA SENHA */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nova Senha</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-200"/>
                                    <input
                                        name="novaSenha"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-100 focus:ring-4 focus:ring-purple-50 outline-none transition-all text-sm font-semibold"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-purple-600 transition-colors">
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                </div>
                            </div>

                            {/* CAMPO: CONFIRMAR SENHA */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirmar Senha</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-200"/>
                                    <input
                                        name="confirmarSenha"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-100 focus:ring-4 focus:ring-purple-50 outline-none transition-all text-sm font-semibold"
                                    />
                                    {/* Botão de olho aqui também para manter simetria visual */}
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-purple-600 transition-colors">
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Alerta de Erro */}
                    {error && (
                        <div className="min-h-[40px] animate-in fade-in zoom-in duration-200">
                            <div className="w-full bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl border border-red-100 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0"/>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#2D0066] text-white text-sm font-bold rounded-2xl hover:bg-purple-900 transition-all disabled:opacity-50 shadow-lg shadow-purple-50 flex justify-center items-center gap-2 active:scale-[0.98]">
                        {loading ? <Loader2 className="animate-spin h-5 w-5"/> : (
                            step === 1 ? "Enviar Código de Acesso" : "Redefinir Minha Senha"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}