export interface ConviteCreateRequest {
    descricao: string;
    emailDestinatario?: string;
    expiraEm: string;
    maxUsos: number;
}