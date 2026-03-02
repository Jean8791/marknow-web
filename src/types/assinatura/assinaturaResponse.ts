export interface AssinaturaResponse {
    oid: string;
    plano: string;
    status: 'TRIAL' | 'ATIVA' | 'ATRASADO' | 'INADIMPLENTE' | 'SUSPENSA' | 'CANCELADA';
    fimPeriodoAtual: string;
    toleranciaAte: string;
    provedor: string;
    referenciaProvedor: string;
    criadoPor: string;
    atualizadoPor: string;
    criadoEm: string;
    atualizadoEm: string;
}