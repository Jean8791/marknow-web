// src/app/(home)/layout.tsx
import HomeHeader from '@/components/home/HomeHeader';
import Sidebar from '@/components/home/Sidebar'; // Se você for criar o menu em components/home também

export default function HomeLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#F8F9FD]">
            {/* 1. Menu Lateral Fixo */}
            <Sidebar/>

            <div className="flex flex-col flex-1 overflow-hidden">
                {/* 2. Cabeçalho Fixo (O que você criou) */}
                <HomeHeader/>

                {/* 3. Área de Conteúdo Dinâmica */}
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Aqui é onde o /dashboard ou /usuarios vão aparecer */}
                    {children}
                </main>
            </div>
        </div>
    );
}