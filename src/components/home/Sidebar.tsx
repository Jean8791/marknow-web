'use client';

import {useEffect, useMemo, useState} from 'react';
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

    const [auth, setAuth] = useState<{ isMounted: boolean; role: string | null }>({
        isMounted: false,
        role: null
    });

    useEffect(() => {
        const role = localStorage.getItem('@MarkNow:user-role');
        const handle = requestAnimationFrame(() => {
            setAuth({
                isMounted: true,
                role: role
            });
        });
        return () => cancelAnimationFrame(handle);
    }, []);

    const filteredMenu = useMemo(() => {
        if (!auth.isMounted) return [];
        return MENU_ITEMS.filter(item => item.roles.includes(auth.role || ''));
    }, [auth.isMounted, auth.role]);

    if (!auth.isMounted) {
        return (
            <aside className="w-64 bg-[#2D0066] flex flex-col h-full shadow-xl">
                <div className="p-8 font-bold italic text-2xl text-white/50">MarkNow</div>
                <div className="flex-1 px-4 space-y-4 pt-4">
                    <div className="h-10 bg-white/5 rounded-xl animate-pulse"/>
                    <div className="h-10 bg-white/5 rounded-xl animate-pulse"/>
                </div>
            </aside>
        );
    }

    return (
        <aside className="w-64 bg-[#2D0066] text-white flex flex-col h-full shadow-xl">
            <div className="p-8 font-bold italic text-2xl">MarkNow</div>
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {filteredMenu.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.path} href={item.path}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-white/20 text-white font-bold' : 'text-purple-100 hover:bg-white/10'}`}>
                            <item.icon size={20} className={isActive ? 'text-white' : 'text-purple-300'}/>
                            <span className="text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}