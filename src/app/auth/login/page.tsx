'use client';

import {Loader2, Lock, LogIn, Mail} from 'lucide-react';
import {useLoginController} from "@/app/auth/login/useLoginController";

export default function LoginPage() {

    const {email, setEmail, senha, setSenha, loading, error, handleSubmit} = useLoginController();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-blue-600">MarkNow</h1>
                    <p className="mt-2 text-sm text-gray-500">Entre na sua conta para gerenciar convites</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                            <input type="email" required
                                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                   placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                            <input type="password" required
                                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                   placeholder="Sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button type="submit" disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-70">
                        {loading ? (
                            <Loader2 className="animate-spin h-5 w-5"/>
                        ) : (
                            <span className="flex items-center gap-2">
                                <LogIn className="h-5 w-5"/> Acessar Painel
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}