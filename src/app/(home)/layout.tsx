// src/app/(home)/layout.tsx
import Sidebar from '@/components/home/Sidebar';
import HomeHeader from '@/components/home/HomeHeader';
import AvisoAcademico from '@/components/common/AvisoAcademico';

export default function HomeLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-[#F8F9FD]">
            {/* Menu Lateral */}
            <Sidebar/>

            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Cabeçalho */}
                <HomeHeader/>
                <AvisoAcademico className="px-8 py-2 bg-purple-50/60 border-b border-purple-100"/>

                {/* Área de Conteúdo */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}