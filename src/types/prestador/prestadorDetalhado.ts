export interface PrestadorDetalhado {
    oid: string;
    nome: string;
    documento: string;
    tipoPessoa: 'PF' | 'PJ';
    status: 'ATIVO' | 'BLOQUEADO'; // Ajuste conforme seu Enum no Java

    // Dados da Assinatura
    statusAssinatura: 'TRIAL' | 'ATIVA' | 'INADIMPLENTE' | 'SUSPENSA' | 'CANCELADA';
    inicioPeriodoAtual: string;
    fimPeriodoAtual: string; // ISO Date string
    provedor: string; // ISO Date string

    // Dados do Plano
    nomePlano: string;
    limiteAgendamentos: number;
    valorPlano: number;
    possuiTrial: boolean;
    diasTrial: number;
}