import {GraduationCap} from 'lucide-react';

export default function AvisoAcademico({className = ''}: { className?: string }) {
    return (
        <p role="note" className={`flex items-center gap-2 text-xs text-gray-500 ${className}`}>
            <GraduationCap size={16} className="shrink-0 text-purple-500"/>
            <span>
                <strong className="text-gray-600">Projeto acadêmico, para fins de estudo.</strong>{' '}
                Os dados são fictícios e as mensagens de WhatsApp só abrem o link, sem envio automático.
            </span>
        </p>
    );
}
