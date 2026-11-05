import {CalendarClock} from 'lucide-react';

export default function Agendamento() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">Agendamentos</h1>
                <p className="text-sm text-gray-500 font-medium">Agenda da unidade por horários.</p>
            </div>
            <div className="bg-white rounded-3xl border border-dashed border-purple-200 p-10 flex flex-col items-center text-center gap-3">
                <div className="p-4 rounded-2xl bg-purple-50 text-purple-600">
                    <CalendarClock size={32}/>
                </div>
                <h2 className="font-bold text-gray-800">Módulo em desenvolvimento</h2>
                <p className="text-sm text-gray-500 max-w-md">
                    O agendamento por horários, com bloqueio de reserva duplicada no banco, é a próxima fase do projeto.
                </p>
            </div>
        </div>
    );
}
