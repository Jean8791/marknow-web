'use client';

import {useState} from 'react';
import {ArrowLeft, Building2, CreditCard, Save, ShieldCheck, User} from 'lucide-react';
import Link from 'next/link';

export default function PrestadorForm() {
    const [loading, setLoading] = useState(false);

    // Estado seguindo exatamente o seu JSON
    const [formData, setFormData] = useState({
        codigo: "",
        oidPlano: "",
        prestador: {
            nome: "",
            documento: "",
            tipoPessoa: "PF"
        },
        usuario: {
            email: "",
            nome: "",
            senha: ""
        }
    });

    return (
        <form className="w-full max-w-[1600px] mx-auto space-y-6">
            {/* Header Compacto e Largo */}
            <div
                className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <Link href="/prestador" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-600"/>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Novo Prestador</h1>
                        <p className="text-xs text-gray-500">Preencha os dados para criar a conta e o acesso.</p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-[#2D0066] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-900 transition-all"
                >
                    <Save size={20}/>
                    Finalizar Cadastro
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LADO ESQUERDO: DADOS DO PRESTADOR E PLANO */}
                <div className="space-y-6">
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div
                            className="flex items-center gap-2 text-purple-600 font-bold mb-6 border-b border-gray-50 pb-4">
                            <Building2 size={20}/>
                            <h2>Dados da Unidade (Prestador)</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2 space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">Nome / Razão Social</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                    placeholder="Ex: Consultório da Laura"
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        prestador: {...formData.prestador, nome: e.target.value}
                                    })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">CPF ou CNPJ</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                    placeholder="Somente números"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">Tipo Pessoa</label>
                                <select
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium text-gray-600">
                                    <option value="PF">Pessoa Física (PF)</option>
                                    <option value="PJ">Pessoa Jurídica (PJ)</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div
                            className="flex items-center gap-2 text-purple-600 font-bold mb-6 border-b border-gray-50 pb-4">
                            <CreditCard size={20}/>
                            <h2>Plano e Identificação</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">Código Interno</label>
                                <input type="text"
                                       className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                       placeholder="Ex: 174758"/>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">ID do Plano</label>
                                <input type="text"
                                       className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                       placeholder="UUID do Plano"/>
                            </div>
                        </div>
                    </section>
                </div>

                {/* LADO DIREITO: DADOS DO USUÁRIO ADMIN */}
                <div className="space-y-6">
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-full">
                        <div
                            className="flex items-center gap-2 text-purple-600 font-bold mb-6 border-b border-gray-50 pb-4">
                            <User size={20}/>
                            <h2>Conta de Acesso (Usuário Administrador)</h2>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">Nome Completo</label>
                                <input type="text"
                                       className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                       placeholder="Nome do gestor"/>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">E-mail de Login</label>
                                <input type="email"
                                       className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                       placeholder="admin@empresa.com"/>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase">Senha Temporária</label>
                                <input type="password"
                                       className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                       placeholder="••••••••"/>
                            </div>

                            <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                                <ShieldCheck className="text-amber-600 shrink-0" size={20}/>
                                <p className="text-xs text-amber-700 leading-relaxed">
                                    Este usuário terá permissão de <strong>ADMIN</strong>. Ele poderá gerenciar
                                    agendamentos, outros usuários e as configurações deste prestador.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </form>
    );
}