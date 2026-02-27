'use client';

import {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Briefcase, Calendar, ClipboardList, CreditCard, LayoutDashboard, Mail, Users} from 'lucide-react';

const MENU_ITEMS = [
    {name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['SUPER_ADMIN', 'ADMIN', 'OPERACIONAL']},
    {name: 'Prestadores', icon: Briefcase, path: '/prestador', roles: ['SUPER_ADMIN']},
    {name: 'Prestador', icon: Briefcase, path: '/prestador/oid', roles: ['ADMIN']},
    {name: 'Usuários', icon: Users, path: '/usuario', roles: ['SUPER_ADMIN', 'ADMIN']},
    {name: 'Usuário', icon: Users, path: '/usuario/oid', roles: ['OPERACIONAL']},
    {name: 'Planos', icon: CreditCard, path: '/plano', roles: ['SUPER_ADMIN']},
    {name: 'Assinaturas', icon: ClipboardList, path: '/assinaturas', roles: ['SUPER_ADMIN']},
    {name: 'Convite', icon: Mail, path: '/convite', roles: ['SUPER_ADMIN']},
    {name: 'Agendamentos', icon: Calendar, path: '/agendamentos', roles: ['ADMIN', 'OPERACIONAL']},
];

export default function Sidebar() {
    const pathname = usePathname();

    const [auth, setAuth] = useState<{
        isMounted: boolean;
        role: string | null;
        userOid: string | null;
        prestadorOid: string | null;
    }>({
        isMounted: false,
        role: null,
        userOid: null,
        prestadorOid: null
    });

    useEffect(() => {
        const role = localStorage.getItem('@MarkNow:user-role');
        const userOid = localStorage.getItem('@MarkNow:user-oid');
        const prestadorOid = localStorage.getItem('@MarkNow:user-prestador_oid');

        const handle = requestAnimationFrame(() => {
            setAuth({
                isMounted: true,
                role,
                userOid,
                prestadorOid
            });
        });
        return () => cancelAnimationFrame(handle);
    }, []);

    const filteredMenu = useMemo(() => {
        if (!auth.isMounted) return [];

        return MENU_ITEMS
            .filter(item => item.roles.includes(auth.role || ''))
            .map(item => {
                let dynamicPath = item.path;

                if (item.path === '/prestador/oid' && auth.prestadorOid) {
                    dynamicPath = `/prestador/${auth.prestadorOid}`;
                }

                if (item.path === '/usuario/oid' && auth.userOid) {
                    dynamicPath = `/usuario/${auth.userOid}`;
                }

                return {...item, path: dynamicPath};
            });
    }, [auth]);

    if (!auth.isMounted) {
        return (
            <aside className="w-64 bg-[#2D0066] flex flex-col h-full shadow-xl">
                <div className="p-8 font-bold italic text-2xl text-white/50">MarkNow</div>
                <div className="flex-1 px-4 space-y-4 pt-4">
                    <div className="h-10 bg-white/5 rounded-xl animate-pulse"/>
                    <div className="h-10 bg-white/5 rounded-xl animate-pulse"/>
                    <div className="h-10 bg-white/5 rounded-xl animate-pulse"/>
                </div>
            </aside>
        );
    }

    return (
        <aside className="w-64 bg-[#2D0066] text-white flex flex-col h-full shadow-xl">
            <div className="p-8 font-bold italic text-2xl tracking-tighter uppercase">
                Mark<span className="text-purple-400">Now</span>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {filteredMenu.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.path} href={item.path}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-white/20 text-white font-bold shadow-inner' : 'text-purple-100 hover:bg-white/10'}`}>
                            <item.icon size={20}
                                       className={`transition-colors ${isActive ? 'text-white' : 'text-purple-300 group-hover:text-white'}`}/>
                            <span className="text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Rodapé opcional para info do usuário ou Logout */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-2 py-2 text-xs text-purple-300">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                    <span className="uppercase font-bold tracking-widest">{auth.role}</span>
                </div>
            </div>
        </aside>
    );
}