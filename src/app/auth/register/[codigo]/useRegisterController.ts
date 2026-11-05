import {useCallback, useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {notify} from "@/utils/toast-service";
import {mensagemErro} from "@/utils/apiError";
import {CadastroCreateRequest} from "@/types/auth/register";
import {PlanoResponse} from "@/types/plano/planoResponse";
import {RegisterService} from "@/app/auth/register/[codigo]/register.service";

const apenasDigitos = (valor: FormDataEntryValue | null) => String(valor ?? '').replace(/\D/g, '');

export const useRegisterController = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [planos, setPlanos] = useState<PlanoResponse[]>([]);
    const params = useParams();
    const router = useRouter();

    const [tipoPessoa, setTipoPessoa] = useState<'PF' | 'PJ'>('PJ');

    const [address, setAddress] = useState({
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: ''
    });

    const rawCodigo = params?.codigo as string;
    const urlInviteCode = rawCodigo === "new" ? "" : rawCodigo;

    useEffect(() => {
        RegisterService.planos()
            .then(setPlanos)
            .catch(() => notify.error("Não foi possível carregar os planos."));
    }, []);

    const nextStep = (formData: FormData) => {
        if (step === 1) {
            if (!formData.get('codigoInvite') || !formData.get('oidPlano')) {
                notify.error("Informe o código do convite e escolha um plano.");
                return false;
            }
            if (!formData.get('prestadorNome') || !formData.get('documento')) {
                notify.error("Preencha os dados da unidade e o documento.");
                return false;
            }
            if (apenasDigitos(formData.get('ddd')).length !== 2 || apenasDigitos(formData.get('telefone')).length < 8) {
                notify.error("Informe o DDD e o telefone da unidade.");
                return false;
            }
        }
        if (step === 2) {
            if (!address.cep || !formData.get('numero')) {
                notify.error("Preencha o CEP e o número.");
                return false;
            }
        }

        setStep(prev => prev + 1);
        return true;
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
        const senha = formData.get('adminSenha') as string;
        if (senha !== formData.get('adminSenhaConfirmacao')) {
            setError("A confirmação de senha não confere.");
            return;
        }

        setLoading(true);
        setError(null);

        const email = (formData.get('adminEmail') as string)?.trim();
        const ddd = apenasDigitos(formData.get('ddd'));
        const telefone = apenasDigitos(formData.get('telefone'));

        const payload: CadastroCreateRequest = {
            codigo: ((formData.get('codigoInvite') as string) || urlInviteCode).trim().toUpperCase(),
            oidPlano: formData.get('oidPlano') as string,
            prestador: {
                nome: formData.get('prestadorNome') as string,
                documento: apenasDigitos(formData.get('documento')),
                tipoPessoa: tipoPessoa,
                email,
                dddTelefone: ddd,
                telefone,
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
                email,
                tipoPessoa: 'PF',
                dddTelefone: ddd,
                telefone,
                senha,
                comfirmarSenha: formData.get('adminSenhaConfirmacao') as string,
                role: 'ADMIN'
            }
        };

        try {
            await RegisterService.register(payload);
            notify.success("Cadastro realizado com sucesso!");
            router.push('/auth/login');
        } catch (err) {
            const msg = mensagemErro(err, "Erro ao realizar cadastro.");
            setError(msg);
            notify.error(msg);
        } finally {
            setLoading(false);
        }
    }, [router, address, tipoPessoa, urlInviteCode]);

    return {
        step, nextStep, prevStep, loading, error, planos,
        handleRegister, urlInviteCode, handleCepBlur,
        address, setAddress, tipoPessoa, setTipoPessoa
    };
};
