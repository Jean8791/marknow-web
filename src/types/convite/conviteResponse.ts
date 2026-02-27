export interface ConviteResponse {
    oid: string;
    codigo: string;
    descricao: string;
    emailDestinatario: string;
    expiraEm: string;
    utilizadoEm?: string;
    usuarioCriado: string;
    maxUsos: number;
    qtdUsado: number;
}