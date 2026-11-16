'use client';

import {useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Briefcase, Calendar, ClipboardList, CreditCard, LayoutDashboard, Mail, Scissors, UserCog, Users} from 'lucide-react';

const MENU_ITEMS = [
    {name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['SUPER_ADMIN', 'ADMIN', 'OPERACIONAL']},
    {name: 'Prestadores', icon: Briefcase, path: '/prestador', roles: ['SUPER_ADMIN']},
    {name: 'Prestador', icon: Briefcase, path: '/prestador/oid', roles: ['ADMIN']},
    {name: 'Usuários', icon: Users, path: '/usuario', roles: ['ADMIN']},
    {name: 'Planos', icon: CreditCard, path: '/plano', roles: ['SUPER_ADMIN']},
    {name: 'Assinaturas', icon: ClipboardList, path: '/assinatura', roles: ['SUPER_ADMIN']},
    {name: 'Convite', icon: Mail, path: '/convite', roles: ['SUPER_ADMIN']},
    {name: 'Agenda', icon: Calendar, path: '/agendamento', roles: ['ADMIN', 'OPERACIONAL']},
    {name: 'Profissionais', icon: UserCog, path: '/profissional', roles: ['ADMIN']},
    {name: 'Serviços', icon: Scissors, path: '/servico', roles: ['ADMIN']},
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


                return {...item, path: dynamicPath};
            });
    }, [auth]);

    const Logo = (
        <div className="hidden md:flex w-11 h-11 mb-4 rounded-2xl bg-marca items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-900/40"
             title="MarkNow">
            M
        </div>
    );

    const containerNav = 'fixed bottom-0 inset-x-0 z-40 h-16 md:static md:h-full md:w-20 bg-purple-900 text-white flex md:flex-col items-center ' +
        'md:py-6 px-2 md:px-0 shadow-[0_-8px_24px_-12px_rgb(59_13_120/0.5)] md:shadow-xl';

    if (!auth.isMounted) {
        return (
            <aside className={containerNav}>
                {Logo}
                <div className="flex md:flex-col gap-3 flex-1 justify-center md:justify-start md:pt-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-11 h-11 bg-white/10 rounded-2xl animate-pulse"/>)}
                </div>
            </aside>
        );
    }

    return (
        <aside className={containerNav}>
            {Logo}

            <nav className="flex md:flex-col flex-1 items-center justify-around md:justify-start gap-1 md:gap-3 md:pt-2 w-full md:w-auto overflow-x-auto md:overflow-visible">
                {filteredMenu.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.path} href={item.path} aria-label={item.name} aria-current={isActive ? 'page' : undefined}
                              className={`relative group flex items-center justify-center w-11 h-11 shrink-0 rounded-2xl transition-all duration-200 ${isActive ? 'bg-marca text-white shadow-lg shadow-purple-950/40' : 'text-purple-200 hover:bg-white/10 hover:text-white'}`}>
                            <item.icon size={20}/>
                            <span className="hidden md:block pointer-events-none absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-gray-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="hidden md:flex w-11 h-11 items-center justify-center" title={auth.role ?? ''}>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"/>
            </div>
        </aside>
    );
}
