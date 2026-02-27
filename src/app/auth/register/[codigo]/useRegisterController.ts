import {useCallback, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {notify} from "@/utils/toast-service";
import {CadastroCreateRequest} from "@/types/auth/register";
import {RegisterService} from "@/app/auth/register/[codigo]/register.service";

export const useRegisterController = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const router = useRouter();

    const rawCodigo = params?.codigo as string;
    const urlInviteCode = rawCodigo === "new" ? "" : rawCodigo;

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleRegister = useCallback(async (formData: FormData) => {
        setLoading(true);
        setError(null);

        const payload: CadastroCreateRequest = {
            codigo: formData.get('codigoInvite') as string,
            oidPlano: "76329437-9753-4804-9549-39744155169a",
            prestador: {
                nome: formData.get('prestadorNome') as string,
                documento: (formData.get('documento') as string)?.replace(/\D/g, ''),
                tipoPessoa: formData.get('tipoPessoa') as any,
                cep: formData.get('cep') as string,
                logradouro: formData.get('logradouro') as string,
                numero: formData.get('numero') as string,
                bairro: formData.get('bairro') as string,
                cidade: formData.get('cidade') as string,
                uf: formData.get('uf') as string,
                complemento: formData.get('complemento') as string,
            },
            usuario: {
                nome: formData.get('adminNome') as string,
                email: formData.get('adminEmail') as string,
                senha: formData.get('adminSenha') as string,
                role: 'ADMIN'
            }
        };

        try {
            await RegisterService.register(payload);
            notify.success("Cadastro realizado com sucesso! Faça login para acessar.");
            router.push('/auth/login');
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao realizar cadastro.");
            notify.error("Falha no cadastro. Verifique os dados.");
        } finally {
            setLoading(false);
        }
    }, [router]);

    return {step, nextStep, prevStep, loading, error, handleRegister, urlInviteCode};
};