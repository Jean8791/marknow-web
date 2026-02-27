'use client';

import {ArrowLeft, Building2, Loader2, Save} from 'lucide-react';
import Link from 'next/link';
import {usePrestadorEditController} from './usePrestadorEditController';

export default function PrestadorForm() {
    // Importamos os dados do controller
    const {prestador, loading, oid} = usePrestadorEditController();

    // Se estiver carregando os dados do banco, mostramos um feedback
    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="animate-spin text-purple-600" size={40}/>
            </div>
        );
    }

    return (
        <form className="w-full max-w-[1600px] mx-auto space-y-6">
            {/* Header */}
            <div
                className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <Link href="/prestador" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-600"/>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            {oid ? 'Editar Prestador' : 'Novo Prestador'}
                        </h1>
                        <p className="text-xs text-gray-500">
                            {oid ? `Editando: ${prestador?.nome}` : 'Preencha os dados para criar a conta.'}
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-[#2D0066] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-900 transition-all shadow-lg active:scale-95">
                    <Save size={20}/>
                    {oid ? 'Salvar Alterações' : 'Finalizar Cadastro'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div
                            className="flex items-center gap-2 text-purple-600 font-bold mb-6 border-b border-gray-50 pb-4">
                            <Building2 size={20}/>
                            <h2>Dados da Unidade (Prestador)</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2 space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nome / Razão
                                    Social</label>
                                <input
                                    type="text"
                                    defaultValue={prestador?.nome || ''} // Preenche com o dado do banco
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium"
                                    placeholder="Ex: Consultório da Laura"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">CPF ou
                                    CNPJ</label>
                                <input
                                    type="text"
                                    defaultValue={prestador?.documento || ''}
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium"
                                    placeholder="Somente números"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tipo
                                    Pessoa</label>
                                <select
                                    defaultValue={prestador?.tipoPessoa || 'PF'}
                                    className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-bold text-gray-600">
                                    <option value="PF">Pessoa Física (PF)</option>
                                    <option value="PJ">Pessoa Jurídica (PJ)</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}