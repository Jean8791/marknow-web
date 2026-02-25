'use client';

import {useState} from 'react';
import {ChevronDown, Clock, Filter, MapPin, Star} from 'lucide-react';

// Componentes que criamos (Certifique-se de que os caminhos estão corretos)
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddressModal from '../components/AddressModal';

// --- DADOS DE EXEMPLO (MOCKS) ---
const CATEGORIES = [
    {id: 1, name: 'Reformas', icon: '🏠', color: 'bg-orange-100 text-orange-600'},
    {id: 2, name: 'Beleza', icon: '💄', color: 'bg-pink-100 text-pink-600'},
    {id: 3, name: 'Saúde', icon: '🩺', color: 'bg-green-100 text-green-600'},
    {id: 4, name: 'Aulas', icon: '📚', color: 'bg-blue-100 text-blue-600'},
    {id: 5, name: 'Pet', icon: '🐾', color: 'bg-yellow-100 text-yellow-600'},
    {id: 6, name: 'Limpeza', icon: '🧹', color: 'bg-purple-100 text-purple-600'},
];

const MOCK_PROVIDERS = [
    {
        id: 1,
        name: 'Carlos Elétrica e Reparos',
        rating: 4.9,
        category: 'Reformas',
        distance: '1.2 km',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400'
    },
    {
        id: 2,
        name: 'Studio Ana Beauty',
        rating: 4.8,
        category: 'Beleza',
        distance: '2.5 km',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'
    },
    {
        id: 3,
        name: 'Dr. Lucas (Fisioterapia)',
        rating: 5.0,
        category: 'Saúde',
        distance: '3.1 km',
        image: 'https://images.unsplash.com/photo-1559839734-2b71f15367ef?w=400'
    },
    {
        id: 4,
        name: 'Diarista Maria Clara',
        rating: 4.7,
        category: 'Limpeza',
        distance: '0.5 km',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?w=400'
    },
    {
        id: 5,
        name: 'Aulas de Violão Prof.',
        rating: 4.9,
        category: 'Aulas',
        distance: '4.0 km',
        image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400'
    },
    {
        id: 6,
        name: 'Banho & Tosa do Bob',
        rating: 4.6,
        category: 'Pet',
        distance: '1.8 km',
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400'
    },
    {
        id: 7,
        name: 'Banho & Tosa do Bob',
        rating: 4.6,
        category: 'Pet',
        distance: '1.8 km',
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400'
    },
    {
        id: 8,
        name: 'Banho & Tosa do Bob',
        rating: 4.6,
        category: 'Pet',
        distance: '1.8 km',
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400'
    },
    {
        id: 9,
        name: 'Banho & Tosa do Bob',
        rating: 4.6,
        category: 'Pet',
        distance: '1.8 km',
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400'
    },
    {
        id: 10,
        name: 'Banho & Tosa do Bob',
        rating: 4.6,
        category: 'Pet',
        distance: '1.8 km',
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400'
    },
];

export default function LandingPage() {
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [location, setLocation] = useState('Selecionar localidade');

    // Controle de paginação simples
    const [visibleCount, setVisibleCount] = useState(3);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* 1. CABEÇALHO */}
            <Header location={location} onOpenLocation={() => setIsLocationModalOpen(true)}/>

            <main className="max-w-7xl mx-auto px-4 py-8">

                {/* 2. BARRA DE CATEGORIAS (ESTILO IFOOD) */}
                <section className="flex gap-6 overflow-x-auto py-6 no-scrollbar border-b border-gray-50 mb-10">
                    {CATEGORIES.map((cat) => (
                        <button key={cat.id}
                                className="flex flex-col items-center gap-3 min-w-[90px] group transition-all">
                            <div
                                className={`w-16 h-16 ${cat.color} rounded-full flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                {cat.icon}
                            </div>
                            <span
                                className="text-sm font-bold text-gray-600 group-hover:text-blue-600">{cat.name}</span>
                        </button>
                    ))}
                </section>

                {/* 3. TÍTULO E FILTROS */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-800">Prestadores próximos</h2>
                        <p className="text-gray-500 text-sm">Os melhores profissionais na sua região de {location}</p>
                    </div>
                    <button
                        className="flex items-center gap-2 border-2 border-gray-100 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition">
                        <Filter size={16}/> Filtros avançados
                    </button>
                </div>

                {/* 4. GRID DE PRESTADORES */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_PROVIDERS.slice(0, visibleCount).map((provider) => (
                        <div
                            key={provider.id}
                            className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 group"
                        >
                            {/* Imagem com Badge de Nota */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={provider.image}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    alt={provider.name}
                                />
                                <div
                                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500"/>
                                    <span className="text-sm font-black text-gray-800">{provider.rating}</span>
                                </div>
                            </div>

                            {/* Conteúdo do Card */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="font-black text-xl text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                                        {provider.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <span
                        className="bg-gray-100 px-2 py-0.5 rounded-md text-gray-600 uppercase text-[10px] tracking-wider">
                      {provider.category}
                    </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><MapPin
                                            size={12}/> {provider.distance}</span>
                                    </div>
                                </div>

                                {/* Botão de Ação */}
                                <button
                                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                                    <Clock size={18}/> Ver Horários Disponíveis
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 5. SEÇÃO CARREGAR MAIS */}
                <div className="mt-20 flex flex-col items-center">
                    {visibleCount < MOCK_PROVIDERS.length ? (
                        <>
                            <button
                                onClick={handleLoadMore}
                                className="group flex items-center gap-3 border-2 border-gray-200 px-12 py-4 rounded-3xl font-black text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
                            >
                                Carregar mais profissionais
                                <ChevronDown size={22} className="group-hover:translate-y-1 transition-transform"/>
                            </button>
                            <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Você viu {visibleCount} de {MOCK_PROVIDERS.length} profissionais
                            </p>
                        </>
                    ) : (
                        <div className="bg-gray-50 px-6 py-3 rounded-full text-gray-400 text-sm font-medium italic">
                            🎉 Você explorou todos os prestadores desta região!
                        </div>
                    )}
                </div>
            </main>

            {/* 6. RODAPÉ */}
            <Footer/>

            {/* 7. MODAIS */}
            <AddressModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
                onConfirm={(val) => {
                    setLocation(val);
                    setIsLocationModalOpen(false);
                }}
            />
        </div>
    );
}