'use client';

import { ArrowLeft, Building2, ImageIcon, Loader2, MapPin, Save, Phone, Smartphone, Mail } from "lucide-react";
import Link from "next/link";
import { usePrestadorEditController } from "@/app/(home)/prestador/[oid]/usePrestadorEditController";
import { formatDocumento } from "@/utils/formatDocumento";
import {formatTelefone} from "@/utils/formatTelefone";

export default function PrestadorForm() {
    const {
        prestador,
        loading,
        isSaving,
        oid,
        handleUpdate,
        handleCepBlur,
        handleLogoChange
    } = usePrestadorEditController();

    const formatarSrcLogo = (logo: string | undefined | null) => {
        if (!logo || logo.trim() === '') return null;
        if (logo.includes('data:image')) return logo;
        return `data:image/png;base64,${logo}`;
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="animate-spin text-purple-600" size={40} />
            </div>
        );
    }

    return (
        <form onSubmit={handleUpdate} className="w-full max-w-[1600px] mx-auto space-y-6 pb-12">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/prestador" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">{oid ? 'Editar Prestador' : 'Novo Prestador'}</h1>
                        <p className="text-xs text-gray-500">{oid ? `Editando: ${prestador?.nome}` : 'Preencha os dados da nova unidade.'}</p>
                    </div>
                </div>
                <button type="submit" disabled={isSaving} className="bg-[#2D0066] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-900 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {oid ? 'Salvar Alterações' : 'Finalizar Cadastro'}
                </button>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Container da Logo */}
                    <section className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4 h-full">
                        <div className="flex items-center gap-2 text-purple-600 font-bold w-full border-b border-gray-50 pb-4 mb-2">
                            <ImageIcon size={20} />
                            <h2>Logo</h2>
                        </div>
                        <input type="file" id="logo-upload" className="hidden" accept="image/*" onChange={handleLogoChange} />
                        <div onClick={() => document.getElementById('logo-upload')?.click()} className="w-32 h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-purple-300 transition-all group overflow-hidden relative">
                            {formatarSrcLogo(prestador?.logoUrl) ? (
                                <>
                                    <img src={formatarSrcLogo(prestador?.logoUrl)!} alt="Logo" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] text-white font-bold uppercase">Trocar Foto</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ImageIcon size={32} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                                    <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-tighter">Subir Logo</span>
                                </>
                            )}
                        </div>
                        <input type="hidden" name="logoUrl" value={prestador?.logoUrl || ''} />
                        <p className="text-[10px] text-gray-400 leading-tight">Clique para alterar.<br />PNG ou JPG até 2MB.</p>
                    </section>

                    {/* Dados da Unidade */}
                    <section className="lg:col-span-3 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 text-purple-600 font-bold mb-6 border-b border-gray-50 pb-4">
                            <Building2 size={20} />
                            <h2>Dados da Unidade</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            {/* Nome / Razão Social */}
                            <div className="md:col-span-3 space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nome / Razão Social</label>
                                <input type="text" name="nome" defaultValue={prestador?.nome || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium" />
                            </div>

                            {/* Tipo Pessoa */}
                            <div className="md:col-span-1 space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tipo Pessoa</label>
                                <select name="tipoPessoa" defaultValue={prestador?.tipoPessoa || 'PF'} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-bold text-gray-600 cursor-pointer">
                                    <option value="PF">Pessoa Física</option>
                                    <option value="PJ">Pessoa Jurídica</option>
                                </select>
                            </div>

                            {/* E-mail */}
                            <div className="md:col-span-2 space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><Mail size={12}/> E-mail da Unidade</label>
                                <input type="email" name="email" defaultValue={prestador?.email || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium" />
                            </div>

                            {/* CPF ou CNPJ */}
                            <div className="md:col-span-2 space-y-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">CPF ou CNPJ</label>
                                <input type="text" name="documento" defaultValue={formatDocumento(prestador?.documento) || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium" />
                            </div>

                            {/* Telefone Fixo */}
                            <div className="md:col-span-2 grid grid-cols-4 gap-2 items-end">
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block leading-tight">DDD</label>
                                    <input type="text" name="dddTelefone" maxLength={2} defaultValue={prestador?.dddTelefone || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium text-center h-[46px]"/>
                                </div>
                                <div className="col-span-3 space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 leading-tight"><Phone size={10} className="shrink-0"/> Telefone Fixo</label>
                                    <input type="text" name="telefone" maxLength={9} defaultValue={formatTelefone(prestador?.telefone) || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium h-[46px]"/>
                                </div>
                            </div>

                            {/* Celular / WhatsApp */}
                            <div className="md:col-span-2 grid grid-cols-4 gap-2 items-end">
                                <div className="col-span-1 space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block leading-tight">DDD</label>
                                    <input type="text" name="dddCelular" maxLength={2} defaultValue={prestador?.dddCelular || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium text-center h-[44px]"/>
                                </div>
                                <div className="col-span-3 space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 leading-tight"><Smartphone size={10}/> Celular / WhatsApp</label>
                                    <input type="text" name="celular" maxLength={10} defaultValue={formatTelefone(prestador?.celular) || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium h-[44px]"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* SEÇÃO: ENDEREÇO COMPLETO */}
                <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-purple-600 font-bold mb-6 border-b border-gray-50 pb-4">
                        <MapPin size={20} />
                        <h2>Endereço de Atendimento</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                        {/* CEP */}
                        <div className="md:col-span-1 space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">CEP</label>
                            <input type="text" name="cep" defaultValue={prestador?.cep || ''} onBlur={(e) => handleCepBlur(e.target.value)} placeholder="00000-000" className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium" />
                        </div>
                        {/* Logradouro (Rua, Av.) */}
                        <div className="md:col-span-4 space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Logradouro (Rua, Av.)</label>
                            <input type="text" name="logradouro" key={prestador?.logradouro} defaultValue={prestador?.logradouro || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium" />
                        </div>
                        {/* Número */}
                        <div className="md:col-span-1 space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Número</label>
                            <input type="text" name="numero" defaultValue={prestador?.numero || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium" />
                        </div>
                        {/* Bairro */}
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bairro</label>
                            <input type="text" name="bairro" key={prestador?.bairro} defaultValue={prestador?.bairro || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium" />
                        </div>
                        {/* Cidade */}
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cidade</label>
                            <input type="text" name="cidade" key={prestador?.cidade} defaultValue={prestador?.cidade || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium" />
                        </div>
                        {/* UF */}
                        <div className="md:col-span-1 space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">UF</label>
                            <input type="text" name="uf" key={prestador?.uf} defaultValue={prestador?.uf || ''} maxLength={2} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium uppercase" />
                        </div>
                        {/* Complemento */}
                        <div className="md:col-span-1 space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Complemento</label>
                            <input type="text" name="complemento" defaultValue={prestador?.complemento || ''} className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm font-medium" />
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
}