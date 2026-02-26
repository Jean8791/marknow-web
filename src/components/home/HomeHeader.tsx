'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Bell, ChevronDown, LogOut, Search, Settings, User} from 'lucide-react';

export default function HomeHeader() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userData, setUserData] = useState({nome: '', perfil: ''});

    useEffect(() => {
        const nome = localStorage.getItem('@MarkNow:user-name') || 'Usuário';
        const perfil = localStorage.getItem('@MarkNow:user-role') || 'Acesso';

        const handle = requestAnimationFrame(() => {
            setUserData({nome, perfil});
        });

        return () => cancelAnimationFrame(handle);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        router.push('/auth/login');
    };

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 relative z-50">
            {/* Barra de Busca */}
            <div className="relative w-96">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <Search size={18}/>
                </span>
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="w-full bg-[#F3F6FF] border-none rounded-2xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 outline-none text-sm text-gray-600 transition-all"
                />
            </div>

            {/* Lado Direito */}
            <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-purple-600 relative transition-colors">
                    <Bell size={22}/>
                    <span
                        className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Perfil com Dropdown */}
                <div className="relative">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-3 pl-6 border-l border-gray-100 hover:opacity-80 transition-opacity focus:outline-none">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-800 uppercase leading-none">
                                {userData.nome}
                            </p>
                            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                                {userData.perfil}
                            </span>
                        </div>
                        <div
                            className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                            <User size={20}/>
                        </div>
                        <ChevronDown size={14}
                                     className={`text-gray-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}/>
                    </button>

                    {isMenuOpen && (
                        <>
                            <div className="fixed inset-0 z-[-1]" onClick={() => setIsMenuOpen(false)}></div>
                            <div
                                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2">
                                <button onClick={() => {
                                    router.push('/perfil');
                                    setIsMenuOpen(false);
                                }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                                    <Settings size={18}/>
                                    Editar Cadastro
                                </button>
                                <div className="h-px bg-gray-100 my-1 mx-4"></div>
                                <button onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                    <LogOut size={18}/>
                                    Sair do Sistema
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}