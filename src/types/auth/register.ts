// Enums para garantir que os valores batam com o Java
export type TipoPessoa = 'PF' | 'PJ';
export type PrestadorUsuarioRole = 'ADMIN' | 'OPERACIONAL';

export interface CadastroCreateRequest {
    codigo: string;
    oidPlano: string;
    prestador: PrestadorCreateRequest;
    usuario: UsuarioCreateRequest;
}

export interface PrestadorCreateRequest {
    nome: string;
    documento: string;
    tipoPessoa: TipoPessoa;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    complemento?: string;
    logoUrl?: string;
}

export interface UsuarioCreateRequest {
    nome: string;
    email: string;
    senha: string;
    role: PrestadorUsuarioRole;
    oidPrestador?: string;
}

