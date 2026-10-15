# marknow-web

Front-end web do **MarkNow**, um SaaS de agenda para prestadores de serviço com vários profissionais atendendo. Consome a API [marknow-api](https://github.com/Jean8791/marknow-api).

> **Status:** MVP em desenvolvimento. Login, cadastro por convite e as telas de administração (prestadores, usuários, planos, assinaturas e convites) estão prontos; a tela de agendamento é a próxima fase.

## Stack

- **Next.js 16** (App Router) e **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- Axios, Lucide (ícones) e Sonner (notificações)

## Funcionalidades

- **Autenticação:** login, recuperação de senha e cadastro a partir de um link de convite (`/auth/register/[codigo]`).
- **Painel administrativo:**
  - dashboard;
  - prestadores, com detalhes em painel lateral e edição de endereço;
  - usuários, planos, assinaturas e convites.
- **Cliente HTTP centralizado** (`services/api.ts`): envia o token JWT em toda chamada, exceto nas rotas públicas de autenticação.
- **Componentes reutilizáveis:** tabela de dados, modal de confirmação, header, sidebar e footer.
- **Formatação** de CPF/CNPJ e telefone.

## Estrutura

Cada tela separa a apresentação (`page.tsx`) da lógica em um **hook controller** (`use...Controller.ts`) e das chamadas à API em um **service** (`*.service.ts`).

```
src/
├── app/
│   ├── auth/          login, cadastro por convite, recuperação de senha
│   └── (home)/        área logada: dashboard, prestador, usuario, plano,
│                      assinatura, convite, agendamento
├── components/        tabela, modais, header, sidebar, footer
├── services/api.ts    instância do Axios com o token
├── types/             tipos de request e response por domínio
└── utils/             formatação e notificações
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
