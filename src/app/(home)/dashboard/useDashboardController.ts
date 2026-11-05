import {useEffect, useState} from "react";
import {Briefcase, CalendarCheck, ClipboardList, CreditCard, Gauge, LucideIcon, Mail, UserCog, Users} from "lucide-react";
import {api} from "@/services/api";
import {AgendamentoService, ProfissionalService} from "@/services/agenda.service";
import {Page} from "@/types/common/page";
import {UsoAgendamentos} from "@/types/agenda/agenda";
import {hojeIso} from "@/utils/agenda";

export interface DashboardStat {
    label: string;
    value?: string | number | null;
    icon: LucideIcon;
    color: string;
    bg: string;
}

interface Indicador extends Omit<DashboardStat, 'value'> {
    carregar: () => Promise<string | number>;
}

const total = (rota: string) => async () =>
    (await api.get<Page<unknown>>(rota, {params: {page: 0, size: 1}})).data.totalElements;

const agendamentosHoje = async () =>
    (await AgendamentoService.listar(hojeIso())).filter(a => a.status === 'AGENDADO').length;

const profissionaisAtivos = async () => (await ProfissionalService.listar(true)).length;

const indicadoresDoPrestador = (incluirUsuarios: boolean): Indicador[] => [
    {label: 'Agendamentos hoje', carregar: agendamentosHoje, icon: CalendarCheck, color: 'text-purple-600', bg: 'bg-purple-50'},
    {label: 'Profissionais ativos', carregar: profissionaisAtivos, icon: UserCog, color: 'text-green-600', bg: 'bg-green-50'},
    ...(incluirUsuarios ? [{label: 'Usuários da unidade', carregar: total('/usuario'), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50'}] : []),
];

const INDICADORES: Record<string, Indicador[]> = {
    SUPER_ADMIN: [
        {label: 'Prestadores', carregar: total('/prestador'), icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50'},
        {label: 'Assinaturas', carregar: total('/assinatura'), icon: ClipboardList, color: 'text-purple-600', bg: 'bg-purple-50'},
        {label: 'Planos', carregar: total('/plano'), icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50'},
        {label: 'Convites', carregar: total('/convite'), icon: Mail, color: 'text-amber-600', bg: 'bg-amber-50'},
    ],
    ADMIN: indicadoresDoPrestador(true),
    OPERACIONAL: indicadoresDoPrestador(false),
};

const semCarregar = (i: Indicador): DashboardStat => ({label: i.label, icon: i.icon, color: i.color, bg: i.bg});

export const useDashboardController = () => {
    const [stats, setStats] = useState<DashboardStat[]>([]);
    const [uso, setUso] = useState<UsoAgendamentos | null>(null);
    const [nome, setNome] = useState('');
    const [perfil, setPerfil] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('@MarkNow:user-role') || '';
        const indicadores = INDICADORES[role] ?? [];
        let ativo = true;

        const handle = requestAnimationFrame(() => {
            setNome(localStorage.getItem('@MarkNow:user-name') || '');
            setPerfil(role);
            setStats(indicadores.map(i => ({...semCarregar(i), value: undefined})));
        });

        Promise.all(indicadores.map(i => i.carregar().catch(() => null)))
            .then(valores => {
                if (ativo) setStats(indicadores.map((i, idx) => ({...semCarregar(i), value: valores[idx]})));
            });

        if (role === 'ADMIN' || role === 'OPERACIONAL') {
            AgendamentoService.uso().then(u => ativo && setUso(u)).catch(() => null);
        }

        return () => {
            ativo = false;
            cancelAnimationFrame(handle);
        };
    }, []);

    return {stats, uso, nome, perfil, iconeUso: Gauge};
};
