// src/app/(home)/layout.tsx
import Sidebar from '@/components/home/Sidebar';
import HomeHeader from '@/components/home/HomeHeader';

export default function HomeLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-[#F8F9FD]">
            {/* Menu Lateral */}
            <Sidebar/>

            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Cabeçalho */}
                <HomeHeader/>

                {/* Área de Conteúdo */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}