import {Agendamento, Profissional} from "@/types/agenda/agenda";
import {diaSemanaIso, hora, minutosDoDia, rotuloHora} from "@/utils/agenda";

const SLOT = 30;
const ALTURA_SLOT = '2.75rem';

interface GradeHorariosProps {
    data: string;
    profissionais: Profissional[];
    agendamentos: Agendamento[];
}

// Grade do dia: uma coluna por profissional, uma linha a cada 30 minutos.
export default function GradeHorarios({data, profissionais, agendamentos}: GradeHorariosProps) {
    const dia = diaSemanaIso(data);
    const marcados = agendamentos.filter(a => a.status === 'AGENDADO');
    const expedientes = new Map(profissionais.map(p => [
        p.oid,
        p.disponibilidades.filter(d => d.diaSemana === dia).map(d => [minutosDoDia(d.horaInicio), minutosDoDia(d.horaFim)]),
    ]));

    const limites = [
        ...[...expedientes.values()].flat().flat(),
        ...marcados.flatMap(a => [minutosDoDia(hora(a.inicio)), minutosDoDia(hora(a.fim))]),
    ];
    if (limites.length === 0) {
        return <p className="p-10 text-center text-sm text-gray-400">Ninguém atende neste dia.</p>;
    }

    const inicio = Math.floor(Math.min(...limites) / SLOT) * SLOT;
    const fim = Math.ceil(Math.max(...limites) / SLOT) * SLOT;
    const slots = Array.from({length: (fim - inicio) / SLOT}, (_, i) => inicio + i * SLOT);
    const linha = (minutos: number) => (minutos - inicio) / SLOT + 2; // a linha 1 é o cabeçalho

    const atende = (oid: string, minutos: number) =>
        expedientes.get(oid)!.some(([de, ate]) => minutos >= de && minutos < ate);

    return (
        <div className="overflow-auto max-h-[34rem]">
            <div className="grid min-w-max"
                 style={{
                     gridTemplateColumns: `4rem repeat(${profissionais.length}, minmax(10rem, 1fr))`,
                     gridTemplateRows: `auto repeat(${slots.length}, ${ALTURA_SLOT})`,
                 }}>
                <div className="sticky top-0 z-20 bg-white"/>
                {profissionais.map((p, i) => (
                    <div key={p.oid} style={{gridColumn: i + 2, gridRow: 1}}
                         className="sticky top-0 z-20 bg-white px-3 py-3 text-sm font-bold text-gray-800 text-center border-b border-purple-100">
                        {p.nome}
                    </div>
                ))}

                {slots.map(minutos => (
                    <div key={minutos} style={{gridColumn: 1, gridRow: linha(minutos)}}
                         className="pr-3 -mt-2 text-right text-[11px] font-semibold text-gray-400">
                        {minutos % 60 === 0 ? rotuloHora(minutos) : ''}
                    </div>
                ))}

                {profissionais.flatMap((p, i) => slots.map(minutos => (
                    <div key={`${p.oid}-${minutos}`} style={{gridColumn: i + 2, gridRow: linha(minutos)}}
                         className={`border-t ${minutos % 60 === 0 ? 'border-purple-100' : 'border-dashed border-purple-50'} ${atende(p.oid, minutos) ? '' : 'bg-gray-50 bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgb(229_231_235/0.6)_6px_7px)]'}`}
                         title={atende(p.oid, minutos) ? `${rotuloHora(minutos)} livre` : 'Fora do expediente'}/>
                )))}

                {marcados.map(a => {
                    const de = minutosDoDia(hora(a.inicio));
                    const ate = minutosDoDia(hora(a.fim));
                    const coluna = profissionais.findIndex(p => p.oid === a.oidProfissional);
                    if (coluna < 0) return null;
                    const ocupa = Math.max(1, Math.ceil((ate - Math.floor(de / SLOT) * SLOT) / SLOT));
                    return (
                        <div key={a.oid}
                             style={{gridColumn: coluna + 2, gridRow: `${linha(Math.floor(de / SLOT) * SLOT)} / span ${ocupa}`}}
                             className="m-0.5 px-3 py-1.5 rounded-xl bg-marca text-white shadow-md shadow-purple-500/20 overflow-hidden z-10">
                            <p className="text-xs font-bold leading-tight truncate">{a.clienteNome}</p>
                            <p className="text-[11px] opacity-90 leading-tight truncate">{hora(a.inicio)}–{hora(a.fim)} · {a.servicoNome}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
