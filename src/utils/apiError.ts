import axios from "axios";

export function mensagemErro(err: unknown, padrao: string): string {
    if (axios.isAxiosError(err)) {
        const data = err.response?.data as { message?: string; fieldErrors?: { message?: string }[] } | undefined;
        const campo = data?.fieldErrors?.find(f => f.message)?.message;
        return campo || data?.message || padrao;
    }
    return padrao;
}
