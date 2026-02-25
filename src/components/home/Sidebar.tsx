'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Briefcase, ChevronRight, LayoutDashboard, LogOut, Users} from 'lucide-react';

const MENU_ITEMS = [
    {name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard'},
    {name: 'Usuários', icon: Users, path: '/usuarios'},
    {name: 'Operacional', icon: Briefcase, path: '/operacional'},
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-[#2D0066] text-white flex flex-col h-full shadow-2xl">
            {/* Logo / Nome do App */}
            <div className="p-8">
                <h1 className="text-2xl font-bold tracking-tight italic">
                    Mark<span className="text-purple-400">Now</span>
                </h1>
            </div>

            {/* Links de Navegação */}
            <nav className="flex-1 px-4 space-y-2">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                                isActive
                                    ? 'bg-white/20 text-white'
                                    : 'text-purple-100 hover:bg-white/10'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className={isActive ? 'text-white' : 'text-purple-300'}/>
                                <span className="font-medium">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight size={16}/>}
                        </Link>
                    );
                })}
            </nav>

            {/* Rodapé da Sidebar - Logout */}
            <div className="p-4 border-t border-purple-500/30">
                <button
                    onClick={() => {/* Lógica de logout aqui */
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-purple-200 hover:text-white hover:bg-red-500/20 rounded-xl transition-colors"
                >
                    <LogOut size={20}/>
                    <span className="font-medium">Sair do Sistema</span>
                </button>
            </div>
        </aside>
    );
}