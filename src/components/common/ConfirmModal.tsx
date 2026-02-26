'use client';

import {AlertTriangle, X} from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'primary';
    isLoading?: boolean;
}

export default function ConfirmModal({
                                         isOpen,
                                         onClose,
                                         onConfirm,
                                         title,
                                         message,
                                         confirmText = 'Confirmar',
                                         cancelText = 'Cancelar',
                                         variant = 'primary',
                                         isLoading = false
                                     }: ConfirmModalProps) {
    if (!isOpen) return null;

    const colors = {
        danger: 'bg-red-600 hover:bg-red-700 shadow-red-100 text-white',
        primary: 'bg-[#2D0066] hover:bg-purple-900 shadow-purple-100 text-white'
    };

    const iconColors = {
        danger: 'bg-red-50 text-red-600',
        primary: 'bg-purple-50 text-purple-600'
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop com desfoque */}
            <div
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div
                className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20}/>
                </button>

                <div className="flex flex-col items-center text-center">
                    <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${iconColors[variant]}`}>
                        <AlertTriangle size={32}/>
                    </div>

                    <h3 className="text-xl font-black text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        {message}
                    </p>

                    <div className="flex w-full gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all border border-gray-100"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`flex-1 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg disabled:opacity-50 ${colors[variant]}`}
                        >
                            {isLoading ? 'Aguarde...' : confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}