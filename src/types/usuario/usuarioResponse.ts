export interface UsuarioResponse {
    oid: string;
    nome: string;
    email: string;
    tipoPessoa: 'PF' | 'PJ';
    documento: string;
    dddTelefone: string;
    telefone: string;
    dddCelular: string;
    celular: string;
    status: 'ATIVO' | 'BLOQUEADO';
    role: 'ADMIN' | 'OPERACIONAL';
    createdAt: string;
    updatedAt: string;
}