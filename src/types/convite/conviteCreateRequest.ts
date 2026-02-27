export interface ConviteCreateRequest {
    descricao: string;
    emailDestinatario?: string;
    expiraEm: string;
    enviarEmail: boolean;
    maxUsos: number;
}