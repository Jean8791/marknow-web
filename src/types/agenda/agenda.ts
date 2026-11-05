export interface Disponibilidade {
    diaSemana: number;
    horaInicio: string;
    horaFim: string;
}

export interface Profissional {
    oid: string;
    nome: string;
    dddTelefone?: string | null;
    telefone?: string | null;
    ativo: boolean;
    disponibilidades: Disponibilidade[];
}

export type ProfissionalRequest = Omit<Profissional, 'oid'>;

export interface Servico {
    oid: string;
    nome: string;
    duracaoMinutos: number;
    valor?: number | null;
    ativo: boolean;
}

export type ServicoRequest = Omit<Servico, 'oid'>;

export type AgendamentoStatus = 'AGENDADO' | 'CANCELADO';
export type WhatsappStatus = 'NAO_ENVIADO' | 'ENVIADO_MANUAL';

export interface Agendamento {
    oid: string;
    oidProfissional: string;
    profissionalNome: string;
    oidServico: string;
    servicoNome: string;
    clienteNome: string;
    clienteDdd: string;
    clienteTelefone: string;
    observacao?: string | null;
    inicio: string;
    fim: string;
    status: AgendamentoStatus;
    whatsappStatus: WhatsappStatus;
}

export interface AgendamentoRequest {
    oidProfissional: string;
    oidServico: string;
    inicio: string;
    clienteNome: string;
    clienteDdd: string;
    clienteTelefone: string;
    observacao?: string;
}

export interface UsoAgendamentos {
    usados: number;
    limite: number | null;
    percentual: number;
    alerta: boolean;
    bloqueado: boolean;
}

export const DIAS_SEMANA = ['', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
