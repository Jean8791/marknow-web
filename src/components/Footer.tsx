export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-1">
                    <h2 className="text-xl font-bold text-blue-600 mb-4">MarkNow</h2>
                    <p className="text-gray-500 text-sm">Simplificando agendamentos entre clientes e profissionais.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Descobrir</h4>
                    <ul className="text-gray-500 text-sm space-y-2 cursor-pointer">
                        <li>Categorias</li>
                        <li>Prestadores Populares</li>
                        <li>Cidades Atendidas</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Para Profissionais</h4>
                    <ul className="text-gray-500 text-sm space-y-2 cursor-pointer">
                        <li>Cadastre seu Serviço</li>
                        <li>Central de Ajuda</li>
                        <li>Termos de Uso</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Social</h4>
                    <div className="flex gap-4 text-gray-400">
                        {/* Aqui entrariam ícones de Instagram/LinkedIn */}
                        <span>Instagram</span>
                        <span>Facebook</span>
                    </div>
                </div>
            </div>
            <div className="text-center mt-12 pt-8 border-t border-gray-200 text-gray-400 text-xs">
                © 2024 MarkNow Inc. Todos os direitos reservados.
            </div>
        </footer>
    );
}