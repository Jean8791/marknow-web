import {Agendamento} from "@/types/agenda/agenda";

export const dataIso = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const hojeIso = () => dataIso(new Date());

export const somarDias = (iso: string, dias: number) => {
    const [a, m, d] = iso.split('-').map(Number);
    return dataIso(new Date(a, m - 1, d + dias));
};

export const diaSemanaIso = (iso: string) => {
    const [a, m, d] = iso.split('-').map(Number);
    const dia = new Date(a, m - 1, d).getDay();
    return dia === 0 ? 7 : dia;
};

export const dataLonga = (iso: string) => {
    const [a, m, d] = iso.split('-').map(Number);
    return new Date(a, m - 1, d).toLocaleDateString('pt-BR', {weekday: 'long', day: '2-digit', month: 'long'});
};

export const dataCurta = (dataHora: string) => `${dataHora.slice(8, 10)}/${dataHora.slice(5, 7)}`;
export const hora = (dataHora: string) => dataHora.slice(11, 16);

const linkWhatsapp = (ddd: string, telefone: string, texto: string) =>
    `https://wa.me/55${ddd}${telefone}?text=${encodeURIComponent(texto)}`;

export const whatsappCliente = (a: Agendamento) => {
    const quando = `${dataCurta(a.inicio)} às ${hora(a.inicio)}`;
    const texto = a.status === 'CANCELADO'
        ? `Olá, ${a.clienteNome}. Seu horário de ${a.servicoNome} em ${quando} foi cancelado. Se quiser remarcar, é só responder esta mensagem.`
        : `Olá, ${a.clienteNome}! Seu horário de ${a.servicoNome} com ${a.profissionalNome} está confirmado para ${quando}. Até lá!`;
    return linkWhatsapp(a.clienteDdd, a.clienteTelefone, texto);
};

export const whatsappProfissional = (a: Agendamento, ddd: string, telefone: string) => {
    const texto = a.status === 'CANCELADO'
        ? `Agendamento cancelado: ${a.clienteNome} (${a.servicoNome}) em ${dataCurta(a.inicio)} às ${hora(a.inicio)}.`
        : `Agendamento: ${a.clienteNome} (${a.servicoNome}) em ${dataCurta(a.inicio)} às ${hora(a.inicio)}. Telefone do cliente: (${a.clienteDdd}) ${a.clienteTelefone}.`;
    return linkWhatsapp(ddd, telefone, texto);
};
