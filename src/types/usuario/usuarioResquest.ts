export type PerfilPrestador = 'ADMIN' | 'OPERACIONAL';

export interface UsuarioRequest {
    oid?: string;
    nome: string;
    email: string;
    tipoPessoa: 'PF' | 'PJ';
    documento?: string;
    dddTelefone: string;
    telefone?: string;
    dddCelular?: string;
    celular?: string;
    senha?: string;
    comfirmarSenha?: string;
    role: PerfilPrestador;
    status?: 'ATIVO' | 'BLOQUEADO';
}
