'use client';

import {ReactNode} from 'react';
import {X} from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    largura?: 'md' | 'lg';
}

export default function Modal({isOpen, onClose, title, children, largura = 'md'}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose}/>
            <div className={`relative bg-white w-full ${largura === 'lg' ? 'max-w-2xl' : 'max-w-md'} max-h-[90vh] overflow-y-auto rounded-[32px] shadow-2xl p-8`}>
                <button type="button" onClick={onClose} aria-label="Fechar"
                        className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20}/>
                </button>
                <h3 className="text-xl font-black text-gray-800 mb-6 pr-8">{title}</h3>
                {children}
            </div>
        </div>
    );
}
