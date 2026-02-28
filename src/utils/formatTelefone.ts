/**
 * Formata uma string de números para Telefone Fixo (0000-0000)
 * ou Celular (00000-0000)
 */
export const formatTelefone = (tel: string | undefined | null): string => {
    if (!tel) return '';

    const value = tel.replace(/\D/g, ''); // Remove tudo que não é número

    // Caso o número venha com o DDD junto (10 ou 11 dígitos)
    if (value.length === 11) {
        return value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }

    if (value.length === 10) {
        return value.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    }

    // Caso seja apenas o número (sem DDD) - comum na sua entidade atual
    if (value.length === 9) {
        return value.replace(/^(\d{5})(\d{4})$/, "$1-$2");
    }

    if (value.length === 8) {
        return value.replace(/^(\d{4})(\d{4})$/, "$1-$2");
    }

    return value; // Retorna o valor original limpo se não encaixar nos padrões
};