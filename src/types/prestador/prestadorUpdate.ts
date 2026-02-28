export interface PrestadorUpdate {
    oid: string;
    nome: string;
    documento: string;
    tipoPessoa: 'PF' | 'PJ';
    logoUrl?: string;
    email?: string;
    dddTelefone?: string;
    telefone?: string;
    dddCelular?: string;
    celular?: string;
    imagem?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    complemento?: string;
}