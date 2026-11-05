import {useEffect, useState} from "react";
import {Briefcase, ClipboardList, CreditCard, LucideIcon, Mail, Users} from "lucide-react";
import {api} from "@/services/api";
import {Page} from "@/types/common/page";

export interface DashboardStat {
    label: string;
    value?: number | null;
    icon: LucideIcon;
    color: string;
    bg: string;
}

interface Indicador {
    label: string;
    rota: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

const INDICADORES: Record<string, Indicador[]> = {
    SUPER_ADMIN: [
        {label: 'Prestadores', rota: '/prestador', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50'},
        {label: 'Assinaturas', rota: '/assinatura', icon: ClipboardList, color: 'text-purple-600', bg: 'bg-purple-50'},
        {label: 'Planos', rota: '/plano', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50'},
        {label: 'Convites', rota: '/convite', icon: Mail, color: 'text-amber-600', bg: 'bg-amber-50'},
    ],
    ADMIN: [
        {label: 'Usuários da unidade', rota: '/usuario', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50'},
    ],
};

const contar = async (rota: string) => {
    const {data} = await api.get<Page<unknown>>(rota, {params: {page: 0, size: 1}});
    return data.totalElements;
};

export const useDashboardController = () => {
    const [stats, setStats] = useState<DashboardStat[]>([]);
    const [nome, setNome] = useState('');
    const [perfil, setPerfil] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('@MarkNow:user-role') || '';
        const indicadores = INDICADORES[role] ?? [];
        let ativo = true;

        const handle = requestAnimationFrame(() => {
            setNome(localStorage.getItem('@MarkNow:user-name') || '');
            setPerfil(role);
            setStats(indicadores.map(i => ({label: i.label, icon: i.icon, color: i.color, bg: i.bg, value: undefined})));
        });

        Promise.all(indicadores.map(i => contar(i.rota).catch(() => null)))
            .then(valores => {
                if (!ativo) return;
                setStats(indicadores.map((i, idx) => ({label: i.label, icon: i.icon, color: i.color, bg: i.bg, value: valores[idx]})));
            });

        return () => {
            ativo = false;
            cancelAnimationFrame(handle);
        };
    }, []);

    return {stats, nome, perfil};
};
