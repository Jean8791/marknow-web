export type LoginResponseRole = 'ADMIN' | 'OPERACIONAL' | 'SUPER_ADMIN';

interface UsuarioDTO {
    oid: string;
    nome: string;
    email: string;
    perfil: LoginResponseRole;
    oidPrestador: string;
}

export interface LoginResponseDTO {
    token: string;
    usuario: UsuarioDTO;
}

export interface LoginRequestDTO {
    email: string;
    senha: string;
}