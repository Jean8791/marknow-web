'use client';
import {MapPin, Search} from 'lucide-react';

interface HeaderProps {
    location: string;
    onOpenLocation: () => void;
}

export default function Header({location, onOpenLocation}: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-blue-600">MarkNow</h1>

                <div className="flex-1 max-w-2xl relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20}/>
                    <input type="text" placeholder="Busque por serviços ou profissionais"
                           className="w-full bg-gray-100 border-none rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"/>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={onOpenLocation}
                            className="hidden md:flex items-center text-gray-600 gap-1 text-sm font-medium hover:text-blue-600 transition">
                        <MapPin size={18} className="text-blue-600"/>
                        {location}
                    </button>
                    <a href="/auth/login" className="text-blue-600 font-semibold">Entrar</a>
                </div>
            </div>
        </header>
    );
}