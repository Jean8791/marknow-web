'use client';

import {ArrowLeft, Loader2, Lock, Save, Trash2, UserRound} from 'lucide-react';
import Link from 'next/link';
import ConfirmModal from "@/components/common/ConfirmModal";
import {useUsuarioFormController} from "@/app/(home)/usuario/[oid]/useUsuarioFormController";

const LABEL = "text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1";
const INPUT = "w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 font-semibold transition-all disabled:text-gray-400";

export default function UsuarioFormPage() {
    const {
        oid, usuario, loading, isSaving, isDeleting, confirmOpen, setConfirmOpen,
        isProprioUsuario, handleSave, handleDelete,
    } = useUsuarioFormController();

    if (loading) return (
        <div className="flex h-96 items-center justify-center">
            <Loader2 className="animate-spin text-purple-600" size={40}/>
        </div>
    );

    return (
        <form onSubmit={handleSave} className="max-w-7xl mx-auto space-y-6 pb-12">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/usuario" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20}/></Link>
                    <h1 className="text-xl font-bold text-gray-800">{oid ? 'Editar Usuário' : 'Novo Usuário'}</h1>
                </div>
                <div className="flex items-center gap-3">
                    {oid && !isProprioUsuario && (
                        <button type="button" onClick={() => setConfirmOpen(true)}
                                className="px-5 py-3 rounded-xl font-bold flex items-center gap-2 text-red-600 hover:bg-red-50 transition-all">
                            <Trash2 size={18}/> Excluir
                        </button>
                    )}
                    <button type="submit" disabled={isSaving}
                            className="bg-[#2D0066] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-900 transition-all shadow-lg disabled:opacity-50">
                        {isSaving ? <Loader2 className="animate-spin" size={20}/> : <Save size={20}/>}Salvar Usuário
                    </button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center gap-2 text-purple-600 font-bold border-b border-gray-50 pb-4">
                    <UserRound size={20}/> <h2>Dados do Usuário</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className={LABEL}>Nome</label>
                        <input name="nome" defaultValue={usuario.nome} required minLength={2} className={INPUT}/>
                    </div>
                    <div className="space-y-1">
                        <label className={LABEL}>E-mail</label>
                        <input name="email" type="email" defaultValue={usuario.email} required className={INPUT}/>
                    </div>
                    <div className="space-y-1">
                        <label className={LABEL}>Tipo de Pessoa</label>
                        <select name="tipoPessoa" defaultValue={usuario.tipoPessoa ?? 'PF'} className={INPUT}>
                            <option value="PF">Pessoa Física</option>
                            <option value="PJ">Pessoa Jurídica</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className={LABEL}>CPF / CNPJ (opcional)</label>
                        <input name="documento" defaultValue={usuario.documento ?? ''} inputMode="numeric" className={INPUT}/>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-1">
                            <label className={LABEL}>DDD</label>
                            <input name="dddTelefone" defaultValue={usuario.dddTelefone} required maxLength={2} inputMode="numeric" className={INPUT}/>
                        </div>
                        <div className="col-span-3 space-y-1">
                            <label className={LABEL}>Telefone (opcional)</label>
                            <input name="telefone" defaultValue={usuario.telefone ?? ''} inputMode="numeric" className={INPUT}/>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className={LABEL}>Perfil de Acesso</label>
                        <select name="role" defaultValue={usuario.role ?? 'OPERACIONAL'} disabled={isProprioUsuario} className={INPUT}>
                            <option value="OPERACIONAL">Operacional</option>
                            <option value="ADMIN">Administrador</option>
                        </select>
                        {isProprioUsuario && <input type="hidden" name="role" value={usuario.role}/>}
                    </div>
                    {oid && (
                        <div className="space-y-1">
                            <label className={LABEL}>Status</label>
                            <select name="status" defaultValue={usuario.status ?? 'ATIVO'} disabled={isProprioUsuario} className={INPUT}>
                                <option value="ATIVO">Ativo</option>
                                <option value="BLOQUEADO">Bloqueado</option>
                            </select>
                            {isProprioUsuario && <input type="hidden" name="status" value={usuario.status}/>}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center gap-2 text-purple-600 font-bold border-b border-gray-50 pb-4">
                    <Lock size={20}/> <h2>{oid ? 'Trocar Senha (opcional)' : 'Senha de Acesso'}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className={LABEL}>Senha</label>
                        <input name="senha" type="password" autoComplete="new-password" required={!oid} className={INPUT}/>
                    </div>
                    <div className="space-y-1">
                        <label className={LABEL}>Confirmar Senha</label>
                        <input name="comfirmarSenha" type="password" autoComplete="new-password" required={!oid} className={INPUT}/>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Excluir usuário"
                message={`Tem certeza que deseja excluir ${usuario.nome ?? 'este usuário'}? Esta ação não pode ser desfeita.`}
                confirmText="Excluir"
                variant="danger"
                isLoading={isDeleting}
            />
        </form>
    );
}
