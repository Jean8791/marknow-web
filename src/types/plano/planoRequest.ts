export interface PlanoRequest {
    oid: string;
    nome: string;
    limiteAgendamentos: number;
    valor: number;
    status: 'ATIVO' | 'INATIVO';
    possuiTrial: boolean;
    diasTrial: number;
}