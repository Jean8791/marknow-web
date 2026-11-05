// src/app/auth/login/page.tsx
'use client';

import {useState} from 'react';
import {Eye, EyeOff, Loader2, Lock, LogIn, Mail, UserRound} from 'lucide-react';
import Link from 'next/link';
import {DEMO, useLoginController} from "./useLoginController";
import AvisoAcademico from "@/components/common/AvisoAcademico";

export default function LoginPage() {
    const {loading, error, handleSubmit, entrarComoVisitante, demoDisponivel} = useLoginController();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans leading-relaxed">
            <div className="w-full max-w-[440px] bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">

                <header className="text-center mb-10">
                    <h1 className="text-4xl font-black italic text-[#2D0066] tracking-tighter uppercase mb-2">
                        Mark<span className="text-purple-500">Now</span>
                    </h1>
                    <p className="text-gray-500 font-medium tracking-tight">
                        Acesse para gerenciar sua unidade.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* Input Email */}
                        <div className="space-y-1">
                            <label
                                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
                            <div className="relative group">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-purple-500 transition-colors"/>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="seu@email.com"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-100 focus:ring-4 focus:ring-purple-50 outline-none transition-all text-sm font-semibold"
                                />
                            </div>
                        </div>

                        {/* Input Senha */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <label
                                    className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Senha</label>
                            </div>
                            <div className="relative group">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-purple-500 transition-colors"/>
                                <input
                                    name="senha"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-100 focus:ring-4 focus:ring-purple-50 outline-none transition-all text-sm font-semibold"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-purple-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Espaço fixo para Erro para evitar saltos na UI */}

                    {error && (
                        <div className="min-h-[50px] flex items-center">
                            <div
                                className="w-full bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl border border-red-100 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shrink-0"/>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#2D0066] text-white text-sm font-bold rounded-2xl hover:bg-purple-900 focus:ring-4 focus:ring-purple-100 transition-all disabled:opacity-50 shadow-lg shadow-purple-50 flex justify-center items-center gap-2 active:scale-[0.98]"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5"/> : (
                            <>Entrar no Painel <LogIn size={18}/></>
                        )}
                    </button>

                    <p className="text-center text-xs font-medium text-gray-400">
                        Novo por aqui?{' '}
                        <Link href="/auth/register/new"
                              className="text-purple-600 font-bold hover:underline underline-offset-4 transition-all">
                            Solicite seu acesso
                        </Link>
                    </p>
                </form>

                {demoDisponivel && (
                    <aside className="mt-8 p-5 rounded-3xl bg-purple-50/60 border border-purple-100 space-y-3 text-center">
                        <p className="text-xs font-bold text-purple-700 uppercase tracking-widest">Quer só conhecer?</p>
                        <p className="text-xs text-gray-600">
                            Entre na unidade de demonstração (<code className="font-bold">{DEMO.email}</code> / <code className="font-bold">{DEMO.senha}</code>),
                            com agenda, profissionais e serviços de exemplo.
                        </p>
                        <button type="button" onClick={entrarComoVisitante} disabled={loading}
                                className="w-full py-3 rounded-2xl border-2 border-purple-200 text-purple-700 text-sm font-bold hover:bg-purple-100 transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                            <UserRound size={18}/> Entrar como visitante
                        </button>
                    </aside>
                )}

                <AvisoAcademico className="mt-6 justify-center text-center"/>
            </div>
        </div>
    );
}