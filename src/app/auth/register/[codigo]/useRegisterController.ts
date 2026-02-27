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

    // Estado para o tipo de pessoa
    const [tipoPessoa, setTipoPessoa] = useState<'PF' | 'PJ'>('PJ');

    // Estado para os campos controlados pelo buscador de CEP
    const [address, setAddress] = useState({
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: ''
    });

    const rawCodigo = params?.codigo as string;
    const urlInviteCode = rawCodigo === "new" ? "" : rawCodigo;

    // Navegação manual para evitar conflitos de validação HTML
    const nextStep = (formData: FormData) => {
        // Validação para não deixar avançar vazio
        if (step === 1) {
            if (!formData.get('prestadorNome') || !formData.get('documento')) {
                notify.error("Preencha os dados da unidade e o documento.");
                return false; // Retorna falso para indicar que não deve avançar
            }
        }
        if (step === 2) {
            if (!address.cep || !formData.get('numero')) {
                notify.error("Preencha o CEP e o número.");
                return false;
            }
        }

        setStep(prev => prev + 1);
        return true; // Avançou com sucesso
    };

    const prevStep = () => setStep(prev => prev - 1);

    const handleCepBlur = async (cep: string) => {
        const cleanCep = cep.replace(/\D/g, '');
        if (cleanCep.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setAddress({
                    cep: cleanCep,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    uf: data.uf
                });
                notify.success("Endereço preenchido!");
            }
        } catch (err) {
            console.error("Erro CEP:", err);
        }
    };

    const handleRegister = useCallback(async (formData: FormData) => {
        setLoading(true);
        setError(null);

        const payload: CadastroCreateRequest = {
            codigo: (formData.get('codigoInvite') as string) || urlInviteCode,
            oidPlano: "76329437-9753-4804-9549-39744155169a",
            prestador: {
                nome: formData.get('prestadorNome') as string,
                documento: (formData.get('documento') as string)?.replace(/\D/g, ''),
                tipoPessoa: tipoPessoa,
                cep: address.cep.replace(/\D/g, ''),
                logradouro: address.logradouro,
                numero: formData.get('numero') as string,
                bairro: address.bairro,
                cidade: address.cidade,
                uf: address.uf,
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
            notify.success("Cadastro realizado com sucesso!");
            router.push('/auth/login');
        } catch (err: any) {
            const msg = err.response?.data?.message || "Erro ao realizar cadastro.";
            setError(msg);
            notify.error(msg);
        } finally {
            setLoading(false);
        }
    }, [router, address, tipoPessoa, urlInviteCode]);

    return {
        step, nextStep, prevStep, loading, error,
        handleRegister, urlInviteCode, handleCepBlur,
        address, setAddress, tipoPessoa, setTipoPessoa
    };
};