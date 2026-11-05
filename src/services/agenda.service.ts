import {api} from "@/services/api";
import {
    Agendamento,
    AgendamentoRequest,
    Profissional,
    ProfissionalRequest,
    Servico,
    ServicoRequest,
    UsoAgendamentos
} from "@/types/agenda/agenda";

export const ProfissionalService = {
    listar: async (somenteAtivos = false) => (await api.get<Profissional[]>('/profissional', {params: {ativos: somenteAtivos}})).data,
    buscar: async (oid: string) => (await api.get<Profissional>(`/profissional/${oid}`)).data,
    salvar: async (payload: ProfissionalRequest, oid?: string | null) => oid
        ? (await api.put<Profissional>(`/profissional/${oid}`, payload)).data
        : (await api.post<Profissional>('/profissional', payload)).data,
};

export const ServicoService = {
    listar: async (somenteAtivos = false) => (await api.get<Servico[]>('/servico', {params: {ativos: somenteAtivos}})).data,
    salvar: async (payload: ServicoRequest, oid?: string | null) => oid
        ? (await api.put<Servico>(`/servico/${oid}`, payload)).data
        : (await api.post<Servico>('/servico', payload)).data,
};

export const AgendamentoService = {
    listar: async (de: string, ate: string = de, oidProfissional?: string) =>
        (await api.get<Agendamento[]>('/agendamento', {params: {de, ate, oidProfissional: oidProfissional || undefined}})).data,
    horariosLivres: async (oidProfissional: string, oidServico: string, data: string, ignorar?: string) =>
        (await api.get<string[]>('/agendamento/horarios-livres', {params: {oidProfissional, oidServico, data, ignorar}})).data
            .map(h => h.slice(0, 5)),
    uso: async () => (await api.get<UsoAgendamentos>('/agendamento/uso')).data,
    criar: async (payload: AgendamentoRequest) => (await api.post<Agendamento>('/agendamento', payload)).data,
    remarcar: async (oid: string, inicio: string, oidProfissional?: string) =>
        (await api.put<Agendamento>(`/agendamento/${oid}/remarcar`, {inicio, oidProfissional})).data,
    cancelar: async (oid: string) => (await api.post<Agendamento>(`/agendamento/${oid}/cancelar`)).data,
    whatsappEnviado: async (oid: string) => (await api.post<Agendamento>(`/agendamento/${oid}/whatsapp-enviado`)).data,
};
