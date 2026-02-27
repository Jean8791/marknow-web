export interface PrestadorUpdate {
    oid: string;
    nome: string;
    documento: string;
    tipoPessoa: 'PF' | 'PJ';
    logoUrl?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    complemento?: string;
}