# marknow-web

Front-end web do **MarkNow**, um SaaS de agenda para prestadores de serviço com vários profissionais atendendo. Consome a API [marknow-api](https://github.com/Jean8791/marknow-api).

> **Status:** MVP funcional. Login, cadastro por convite, administração (prestadores, usuários, planos, assinaturas e convites) e a agenda interna (profissionais, serviços e agendamentos) estão prontos.

## Stack

- **Next.js 16** (App Router) e **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- Axios, Lucide (ícones) e Sonner (notificações)

## Funcionalidades

- **Autenticação:** login e cadastro a partir de um link de convite (`/auth/register/[codigo]`), com escolha do plano entre os planos ativos.
- **Painel por perfil:**
  - **super admin:** dashboard com totais, prestadores (detalhes em painel lateral, busca e exclusão), planos, assinaturas e convites;
  - **admin do prestador:** tudo do operacional, mais profissionais (com editor de disponibilidade semanal), serviços, edição do próprio prestador e usuários (criar, editar perfil e status, trocar senha e excluir);
  - **operacional:** dashboard (agendamentos do dia e uso da quota do plano) e agenda.
- **Agenda:** visão do dia por profissional, com navegação por data e filtro; novo agendamento escolhendo entre os horários livres calculados pela API; remarcar, cancelar e avisar o cliente ou o profissional pelo WhatsApp (link `wa.me` com mensagem pronta, e o status de "avisado" fica registrado); alerta quando a quota do plano passa de 80% e bloqueio em 100%.
- **Proteção de rotas** no `proxy.ts` conforme o perfil, espelhando as permissões da API (a API continua sendo quem garante o acesso).
- **Cliente HTTP centralizado** (`services/api.ts`): envia o token JWT em toda chamada, exceto nas rotas públicas de autenticação.
- **Componentes reutilizáveis:** tabela de dados, modal de confirmação, header, sidebar e footer.
- **Formatação** de CPF/CNPJ e telefone.

## Estrutura

Cada tela separa a apresentação (`page.tsx`) da lógica em um **hook controller** (`use...Controller.ts`) e das chamadas à API em um **service** (`*.service.ts`).

```
src/
├── app/
│   ├── auth/          login e cadastro por convite
│   └── (home)/        área logada: dashboard, prestador, usuario, plano,
│                      assinatura, convite, agendamento (agenda),
│                      profissional, servico
├── components/        tabela, modais, header, sidebar, footer
├── services/          instância do Axios com o token e services da agenda
├── types/             tipos de request e response por domínio
└── utils/             formatação, notificações e mensagens de erro da API
```

## Como rodar

### Pré-requisitos

- Node.js 20+ e npm
- O [marknow-api](https://github.com/Jean8791/marknow-api) rodando (por padrão em `http://localhost:9696`)

### Instalação

```bash
npm install
```

### Configuração

Se a API não estiver no endereço padrão, crie um `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:9696
```

### Servidor de desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`.

### Build de produção

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```
