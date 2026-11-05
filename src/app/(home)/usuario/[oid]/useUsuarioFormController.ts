import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {notify} from "@/utils/toast-service";
import {mensagemErro} from "@/utils/apiError";
import {UsuarioService} from "@/app/(home)/usuario/usuario.service";
import {UsuarioResponse} from "@/types/usuario/usuarioResponse";
import {PerfilPrestador, UsuarioRequest} from "@/types/usuario/usuarioResquest";

const texto = (formData: FormData, campo: string) => ((formData.get(campo) as string) ?? '').trim();
const digitos = (formData: FormData, campo: string) => texto(formData, campo).replace(/\D/g, '');

export const useUsuarioFormController = () => {
    const params = useParams();
    const router = useRouter();
    const oidParam = params?.oid as string;
    const oid = oidParam && oidParam !== 'new' ? oidParam : null;

    const [usuario, setUsuario] = useState<Partial<UsuarioResponse>>({tipoPessoa: 'PF', role: 'OPERACIONAL', status: 'ATIVO'});
    const [loading, setLoading] = useState(!!oid);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [usuarioLogadoOid, setUsuarioLogadoOid] = useState<string | null>(null);

    useEffect(() => {
        const handle = requestAnimationFrame(() => setUsuarioLogadoOid(localStorage.getItem('@MarkNow:user-oid')));
        return () => cancelAnimationFrame(handle);
    }, []);

    useEffect(() => {
        if (!oid) return;
        UsuarioService.getById(oid)
            .then(setUsuario)
            .catch(err => {
                notify.error(mensagemErro(err, "Usuário não encontrado."));
                router.push('/usuario');
            })
            .finally(() => setLoading(false));
    }, [oid, router]);

    const handleSave = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const senha = texto(formData, 'senha');
        const comfirmarSenha = texto(formData, 'comfirmarSenha');
        if (!oid && !senha) {
            notify.error("Informe a senha do novo usuário.");
            return;
        }
        if (senha !== comfirmarSenha) {
            notify.error("A confirmação de senha não confere.");
            return;
        }

        const payload: UsuarioRequest = {
            oid: oid ?? undefined,
            nome: texto(formData, 'nome'),
            email: texto(formData, 'email'),
            tipoPessoa: formData.get('tipoPessoa') as 'PF' | 'PJ',
            documento: digitos(formData, 'documento') || undefined,
            dddTelefone: digitos(formData, 'dddTelefone'),
            telefone: digitos(formData, 'telefone') || undefined,
            role: formData.get('role') as PerfilPrestador,
            status: oid ? formData.get('status') as 'ATIVO' | 'BLOQUEADO' : undefined,
            senha: senha || undefined,
            comfirmarSenha: comfirmarSenha || undefined,
        };

        setIsSaving(true);
        try {
            await UsuarioService.save(payload);
            notify.success("Usuário salvo com sucesso!");
            router.push('/usuario');
        } catch (err) {
            notify.error(mensagemErro(err, "Erro ao salvar usuário."));
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!oid) return;
        setIsDeleting(true);
        try {
            await UsuarioService.delete(oid);
            notify.success("Usuário excluído.");
            router.push('/usuario');
        } catch (err) {
            notify.error(mensagemErro(err, "Erro ao excluir usuário."));
        } finally {
            setIsDeleting(false);
            setConfirmOpen(false);
        }
    };

    return {
        oid, usuario, loading, isSaving, isDeleting, confirmOpen, setConfirmOpen,
        isProprioUsuario: !!oid && oid === usuarioLogadoOid,
        handleSave, handleDelete,
    };
};
