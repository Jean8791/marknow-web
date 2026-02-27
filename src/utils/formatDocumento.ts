// src/utils/formatDocumento.ts

/**
 * Formata uma string de números para CPF (000.000.000-00)
 * ou CNPJ (00.000.000/0000-00)
 */
export const formatDocumento = (doc: string | undefined | null): string => {
    if (!doc) return '---';

    const value = doc.replace(/\D/g, ''); // Remove tudo que não é número

    // CPF
    if (value.length <= 11) {
        return value
            .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }

    // CNPJ
    return value
        .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
};