export interface UsuarioResquest {
    oid: string;
    oidPrestador?: string;
    nome: string;
    email: string;
    tipoPessoa: 'PF' | 'PJ';
    documento: string;
    dddTelefone: string;
    telefone: string;
    dddCelular: string;
    celular: string;
    senha: string;
    comfirmarSenha: string;
    imagem?: string;
}