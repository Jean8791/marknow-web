// DTO que o Front envia para o Login
export interface LoginRequestDTO {
    email: string;
    senha: string;
}

// DTO que o Backend (Quarkus) devolve no sucesso
export interface LoginResponseDTO {
    token: string;
    usuario: {
        oid: string;
        nome: string;
        perfil: 'ADMIN' | 'OPERACIONAL';
    };
}