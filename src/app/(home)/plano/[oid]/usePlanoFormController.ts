import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {notify} from "@/utils/toast-service";
import {PlanoService} from "@/app/(home)/plano/plano.service";
import {PlanoRequest} from "@/types/plano/planoRequest";

export const usePlanoFormController = () => {
    const {oid} = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [plano, setPlanoRequest] = useState<Partial<PlanoRequest>>({
        status: 'ATIVO',
        possuiTrial: false,
        diasTrial: 0
    });

    useEffect(() => {
        if (oid && oid !== 'new') {
            setLoading(true);
            PlanoService.getById(oid as string)
                .then(setPlanoRequest)
                .finally(() => setLoading(false));
        }
    }, [oid]);

    const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);

        const payload: Partial<PlanoRequest> = {
            ...plano,
            nome: formData.get('nome') as string,
            valor: Number(formData.get('valor')),
            limiteAgendamentos: Number(formData.get('limiteAgendamentos')),
            status: formData.get('status') as 'ATIVO' | 'INATIVO',
            possuiTrial: formData.get('possuiTrial') === 'true',
            diasTrial: Number(formData.get('diasTrial') || 0),
        };

        try {
            await PlanoService.save(payload);
            notify.success("Plano salvo com sucesso!");
            router.push('/plano');
        } catch (error) {
            notify.error("Erro ao salvar plano.");
        } finally {
            setIsSaving(false);
        }
    };

    return {plano, loading, isSaving, handleSave, oid: oid === 'new' ? null : oid};
};