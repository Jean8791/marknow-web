// src/app/(home)/layout.tsx
import Sidebar from '@/components/home/Sidebar';
import HomeHeader from '@/components/home/HomeHeader';
import AvisoAcademico from '@/components/common/AvisoAcademico';

export default function HomeLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            {/* Menu: barra de ícones à esquerda; no celular, barra inferior */}
            <Sidebar/>

            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Cabeçalho */}
                <HomeHeader/>
                <AvisoAcademico className="mx-4 md:mx-8 mb-2 px-4 py-2 rounded-2xl bg-purple-50 text-purple-800"/>

                {/* Área de Conteúdo */}
                <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}