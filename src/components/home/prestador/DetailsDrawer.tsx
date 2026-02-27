// components/prestador/DetailsDrawer.tsx
import { Prestador } from "@/types/prestador";
import { X, User, CreditCard, Calendar, ShieldCheck } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    item: Prestador | null;
}

export default function DetailsDrawer({ isOpen, onClose, item }: Props) {
    if (!item) return null;

    return (
        <>
            {/* Overlay */}
            <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />

            {/* Painel */}
            <div className={`fixed right-0 top-0 h-full w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-8 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-black text-gray-800 tracking-tight">Ficha do Prestador</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={24} className="text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-8 overflow-y-auto pr-2">
                        {/* Seção Dados Gerais */}
                        <section className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-2 mb-4 text-[#2D0066] font-bold">
                                <User size={18} /> <span>Informações Cadastrais</span>
                            </div>
                            <div className="grid grid-cols-1 gap-y-3 text-sm">
                                <div><p className="text-gray-400 text-[11px] uppercase font-bold tracking-wider">Nome Completo</p><p className="font-semibold text-gray-700">{item.nome}</p></div>
                                <div><p className="text-gray-400 text-[11px] uppercase font-bold tracking-wider">Documento ({item.tipoPessoa})</p><p className="font-semibold text-gray-700">{item.documento}</p></div>
                                <div><p className="text-gray-400 text-[11px] uppercase font-bold tracking-wider">Status Sistema</p><p className="font-semibold text-gray-700">{item.status}</p></div>
                            </div>
                        </section>

                        {/* Seção Financeiro / Assinatura */}
                        <section className="bg-purple-50 p-5 rounded-2xl border border-purple-100">
                            <div className="flex items-center gap-2 mb-4 text-purple-700 font-bold">
                                <ShieldCheck size={18} /> <span>Assinatura e Vencimento</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><p className="text-purple-400 text-[11px] uppercase font-bold tracking-wider">Status</p><p className="font-bold text-purple-700">{item.statusAssinatura || 'SEM ASSINATURA'}</p></div>
                                <div><p className="text-purple-400 text-[11px] uppercase font-bold tracking-wider">Validade</p><p className="font-bold text-gray-700">{item.fimPeriodoAtual ? new Date(item.fimPeriodoAtual).toLocaleDateString() : '-'}</p></div>
                            </div>
                        </section>

                        {/* Seção Plano */}
                        <section className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                            <div className="flex items-center gap-2 mb-4 text-orange-700 font-bold">
                                <CreditCard size={18} /> <span>Detalhes do Plano</span>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between border-b border-orange-100 pb-2"><span className="text-orange-600 font-medium">Nome do Plano:</span><span className="font-bold text-gray-700">{item.nomePlano || 'Não vinculado'}</span></div>
                                <div className="flex justify-between border-b border-orange-100 pb-2"><span className="text-orange-600 font-medium">Limite Mensal:</span><span className="font-bold text-gray-700">{item.limiteAgendamentos} agendamentos</span></div>
                                <div className="flex justify-between"><span className="text-orange-600 font-medium">Valor Mensal:</span><span className="font-bold text-green-600">R$ {item.valorPlano?.toFixed(2)}</span></div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}