import {Bell, Search, User} from 'lucide-react';

export default function HomeHeader() {
    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
            {/* Barra de Busca (lado esquerdo) */}
            <div className="relative w-96">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <Search size={18}/>
        </span>
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="w-full bg-[#F3F6FF] border-none rounded-2xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 outline-none text-sm text-gray-600"
                />
            </div>

            {/* Ações e Perfil (lado direito) */}
            <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-purple-600 relative">
                    <Bell size={22}/>
                    <span
                        className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-800 uppercase leading-none">Jean Silva</p>
                        <span
                            className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Administrador</span>
                    </div>
                    <div
                        className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                        <User size={20}/>
                    </div>
                </div>
            </div>
        </header>
    );
}