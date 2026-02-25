'use client';
import {MapPin, X} from 'lucide-react';

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (city: string) => void;
}

export default function AddressModal({isOpen, onClose, onConfirm}: AddressModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
                <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600">
                    <X size={24}/>
                </button>

                <div className="text-center mb-8">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="text-blue-600" size={32}/>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Onde você está?</h3>
                    <p className="text-gray-500 mt-2">Mostraremos os prestadores que atendem a sua região.</p>
                </div>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Digite seu CEP"
                        className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all text-lg"
                    />

                    <button
                        onClick={() => onConfirm('Joinville, SC')}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                        Confirmar Localização
                    </button>
                </div>
            </div>
        </div>
    );
}