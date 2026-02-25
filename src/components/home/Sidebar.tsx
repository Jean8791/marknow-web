'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Briefcase, Calendar, ClipboardList, CreditCard, LayoutDashboard, Mail, Users} from 'lucide-react';

const MENU_ITEMS = [
    {name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['SUPER_ADMIN', 'ADMIN', 'OPERACIONAL']},
    {name: 'Prestadores', icon: Briefcase, path: '/prestador', roles: ['SUPER_ADMIN']},
    {name: 'Usuários', icon: Users, path: '/usuario', roles: ['SUPER_ADMIN', 'ADMIN']},
    {name: 'Planos', icon: CreditCard, path: '/plano', roles: ['SUPER_ADMIN']},
    {name: 'Assinaturas', icon: ClipboardList, path: '/assinaturas', roles: ['SUPER_ADMIN']},
    {name: 'Convite', icon: Mail, path: '/convite', roles: ['SUPER_ADMIN']},
    {name: 'Agendamentos', icon: Calendar, path: '/agendamentos', roles: ['ADMIN', 'OPERACIONAL']},
];

export default function Sidebar() {
    const pathname = usePathname();

    const userRole = typeof window !== 'undefined' ? localStorage.getItem('@MarkNow:user-role') : null;

    const filteredMenu = MENU_ITEMS.filter(item =>
        item.roles.includes(userRole || '')
    );

    return (
        <aside className="w-64 bg-[#2D0066] text-white flex flex-col h-full">
            <div className="p-8 font-bold italic text-2xl">MarkNow</div>

            <nav className="flex-1 px-4 space-y-2">
                {filteredMenu.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                isActive ? 'bg-white/20' : 'hover:bg-white/10'
                            }`}
                        >
                            <item.icon size={20}/>
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}