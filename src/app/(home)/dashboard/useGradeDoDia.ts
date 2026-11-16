import {useEffect, useState} from "react";
import {AgendamentoService, ProfissionalService} from "@/services/agenda.service";
import {Agendamento, Profissional} from "@/types/agenda/agenda";
import {notify} from "@/utils/toast-service";
import {mensagemErro} from "@/utils/apiError";

export const useGradeDoDia = (data: string, ativa: boolean) => {
    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [carregando, setCarregando] = useState(ativa);

    useEffect(() => {
        if (!ativa) return;
        let atual = true;
        Promise.all([ProfissionalService.listar(true), AgendamentoService.listar(data)])
            .then(([p, a]) => {
                if (!atual) return;
                setProfissionais(p);
                setAgendamentos(a);
            })
            .catch(err => atual && notify.error(mensagemErro(err, "Erro ao carregar a grade do dia.")))
            .finally(() => atual && setCarregando(false));
        return () => {
            atual = false;
        };
    }, [data, ativa]);

    return {profissionais, agendamentos, carregando};
};
