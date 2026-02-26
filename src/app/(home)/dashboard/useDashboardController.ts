import {useState} from "react";
import {useRouter} from "next/navigation";
import {Calendar, DollarSign, TrendingUp, Users} from "lucide-react";

export const useDashboardController = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const stats = [
        {label: 'Total de Clientes', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50'},
        {label: 'Agendamentos Hoje', value: '42', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50'},
        {label: 'Taxa de Conversão', value: '12.5%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50'},
        {label: 'Faturamento Mês', value: 'R$ 12.450', icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50'},
    ];

    return {
        loading,
        error,
        stats,
    };
}