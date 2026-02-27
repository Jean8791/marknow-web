import {useCallback, useState} from "react";
import {notify} from "@/utils/toast-service";
import {ConviteResponse} from "@/types/convite/conviteResponse";
import {ConviteService} from "@/app/(home)/convite/convites.service";

export const useConviteController = () => {
    const [loading, setLoading] = useState(false);
    const [invite, setInvite] = useState<ConviteResponse | null>(null);

    const gerarConvite = useCallback(async (formData: FormData) => {
        setLoading(true);

        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);

        const payload = {
            descricao: formData.get('descricao') as string,
            emailDestinatario: (formData.get('email') as string) || undefined,
            expiraEm: amanha.toISOString(),
            maxUsos: Number(formData.get('maxUsos')) || 1
        };

        try {
            const data = await ConviteService.create(payload);
            setInvite(data);
            notify.success("Convite criado com sucesso!");
        } catch (err: any) {
            const msg = err.response?.data?.message || "Erro ao criar convite.";
            notify.error(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    const copiarLink = (codigo: string) => {
        const link = `${window.location.origin}/auth/register/${codigo}`;
        navigator.clipboard.writeText(link);
        notify.info("Link de cadastro copiado!");
    };

    return {loading, invite, gerarConvite, copiarLink};
};