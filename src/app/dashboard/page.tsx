'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Calendar, LayoutDashboard, LogOut, Plus, Users} from 'lucide-react';

export default function Dashboard() {
    const router = useRouter();
    const [userName, setUserName] = useState('Administrador');

    // Proteção de Rota Básica
    useEffect(() => {
        const token = localStorage.getItem('marknow_token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    function handleLogout() {
        localStorage.removeItem('marknow_token');
        router.push('/login');
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* SIDEBAR */}
            <aside className="w-64 bg-blue-900 text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-blue-800">
                    MarkNow
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button className="flex items-center gap-3 w-full p-3 bg-blue-800 rounded-lg">
                        <LayoutDashboard size={20}/> Dashboard
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 hover:bg-blue-800 rounded-lg transition">
                        <Calendar size={20}/> Convites
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 hover:bg-blue-800 rounded-lg transition">
                        <Users size={20}/> Clientes
                    </button>
                </nav>
                <button
                    onClick={handleLogout}
                    className="p-4 flex items-center gap-3 hover:bg-red-600 transition border-t border-blue-800"
                >
                    <LogOut size={20}/> Sair
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Bem-vindo, {userName}</h2>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
                        <Plus size={20}/> Novo Convite
                    </button>
                </header>

                {/* CARDS DE RESUMO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-sm">Convites Enviados</p>
                        <p className="text-3xl font-bold">128</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-sm">Aguardando Resposta</p>
                        <p className="text-3xl font-bold text-orange-500">42</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-sm">Confirmados</p>
                        <p className="text-3xl font-bold text-green-500">86</p>
                    </div>
                </div>
            </main>
        </div>
    );
}