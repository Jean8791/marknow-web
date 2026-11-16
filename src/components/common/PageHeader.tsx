import {ReactNode} from 'react';

interface PageHeaderProps {
    titulo: string;
    subtitulo?: string;
    children?: ReactNode;
}

// Cabeçalho de página: título com marca-texto em gradiente à esquerda e ação opcional à direita.
export default function PageHeader({titulo, subtitulo, children}: PageHeaderProps) {
    return (
        <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
                <span className="w-1.5 self-stretch min-h-10 rounded-full bg-marca" aria-hidden/>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{titulo}</h1>
                    {subtitulo && <p className="text-sm text-gray-500 font-medium first-letter:uppercase">{subtitulo}</p>}
                </div>
            </div>
            {children}
        </div>
    );
}
