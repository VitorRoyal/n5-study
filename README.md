# N5 Study

> Aplicação full stack para estudo do japonês, focada na preparação para o exame JLPT N5. Reúne hiragana, katakana, kanjis, quiz de imagens e exercícios de frases, com acesso protegido por login.

---

## Tecnologias

### Frontend

- React 19
- TypeScript
- Vite
- React Router DOM
- styled-components

### Backend

- Java 17
- Spring Boot 3.4
- Spring Security com autenticação JWT
- Spring Data JPA
- MapStruct
- PostgreSQL 16
- Docker e Docker Compose

---

## Estrutura de Pastas

```
n5-study/
├── backend/                       # API REST em Spring Boot
│   ├── src/main/java/br/com/n5study/
│   │   ├── core/usuario/           # Domínio de usuário
│   │   │   ├── controller/          # Endpoints REST
│   │   │   ├── service/             # Regras de negócio
│   │   │   ├── repository/          # Acesso ao banco
│   │   │   ├── entity/              # Entidades JPA
│   │   │   ├── dto/                 # Request e Response DTOs
│   │   │   ├── mapper/              # Conversão entidade/DTO
│   │   │   └── usuarioEnum/         # Enums do domínio
│   │   ├── seguranca/              # JWT, filtro e configuração do Spring Security
│   │   ├── configuracao/           # Carga inicial do usuário admin
│   │   └── excecao/                # Exceções customizadas e handler global
│   ├── src/main/resources/
│   │   └── application.yml
│   └── Dockerfile
│   ├── docker-compose.yml          # PostgreSQL + API
│   └── Dockerfile
├── frontend/                      # Aplicação React
│   ├── src/
│   │   ├── components/             # Componentes de UI reutilizáveis
│   │   ├── contexts/               # Contexto de autenticação
│   │   ├── services/               # Cliente HTTP e chamadas de autenticação
│   │   ├── modules/                # Telas da aplicação
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── Flashcards/
│   │   │   └── Study/
│   │   ├── styles/                 # Paleta de cores e estilos globais
│   │   ├── App.tsx                 # Rotas e proteção de acesso
│   │   └── main.tsx
│   ├── public/
│   └── index.html
└── README.md
```

| Camada | Responsabilidade |
|--------|-----------------|
| `controller/` | Recebe requisições HTTP e delega para o Service |
| `service/` | Contém as regras de negócio |
| `repository/` | Acesso ao banco de dados |
| `entity/` | Entidades e modelos de dados |
| `dto/` | Objetos de entrada e saída da API |
| `seguranca/` | Geração e validação de token, filtro de autenticação |
| `frontend/src/services/` | Cliente HTTP do frontend e chamadas de autenticação |
| `frontend/src/contexts/` | Estado global de sessão do usuário |

---

## Como Instalar e Rodar

### Pré-requisitos

- Docker e Docker Compose
- Node.js 20+

### Banco de dados e API

O PostgreSQL e a API sobem juntos pelo Docker Compose, a partir da pasta `backend`:

```bash
cd backend
docker compose up -d --build
```

A API fica disponível em `http://localhost:8080/api/v1` e o banco na porta `5432`.
Para parar tudo, ainda dentro de `backend`:

```bash
docker compose down
```

### Frontend

A partir da pasta `frontend`:

```bash
cd frontend
npm install
npm run dev
```

### Build de produção do frontend

```bash
npm run build
npm run preview
```

---

## Acesso

O sistema exige login: todas as telas de estudo são protegidas e redirecionam para `/login` quando não há sessão válida.

Na primeira subida da API, um usuário administrador é criado automaticamente:

| Usuário | Senha |
|---------|-------|
| `admin` | `admin123` |

As senhas nunca são gravadas em texto puro. O banco armazena apenas o nome de usuário e o hash BCrypt da senha. O segredo de assinatura do JWT, o usuário e a senha do admin são configurados pelas variáveis definidas no `docker-compose.yml` e devem ser alterados antes de qualquer uso fora do ambiente local.

---

## Principais Funcionalidades

- Login e cadastro com senha protegida por hash BCrypt e sessão via token JWT
- Quiz de flashcards com 5 cards simultâneos e verificação automática da resposta digitada (hiragana, katakana e kanji)
- Quiz de imagens com 50 ilustrações e rodadas configuráveis de 10, 25 ou 50 cards
- Exercícios de completar frases, com tradução palavra a palavra e explicação gramatical
- Base de vocabulário do N5: gojuon completo, mais de 100 kanjis e 50 palavras ilustradas

---

## Endpoints

### Autenticação — `/api/v1/autenticacao`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/v1/autenticacao/login` | Autentica um usuário e retorna o token JWT |
| `POST` | `/api/v1/autenticacao/cadastro` | Cria uma conta e já retorna o token JWT |

### Usuários — `/api/v1/usuarios`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/v1/usuarios/eu` | Retorna os dados do usuário autenticado |

---

## Em Breve

O projeto está em evolução e os próximos módulos planejados incluem:

- Compreensão auditiva: ouvir áudios e responder o que foi dito
- Tradução de frases e textos curtos
- Banco de frases de exemplo para contextualizar o vocabulário estudado

---

## Ideias para Próximos Passos

Sugestões de funcionalidades que podem agregar valor ao projeto:

- Migrações de banco versionadas com Flyway, substituindo a geração automática de schema
- Progresso de estudo salvo por usuário no banco, em vez de apenas em memória
- Repetição espaçada (spaced repetition/SRS), priorizando cards errados com mais frequência
- Tela de estatísticas e progresso por categoria (percentual de acerto, cards dominados, tempo de estudo)
- Modo de revisão dedicado aos erros mais recentes
- Simulados no formato do exame JLPT N5 (leitura, gramática, vocabulário)
- Painel administrativo restrito ao papel ADMIN, para gerenciar vocabulário e usuários
- Prática de escrita com ordem dos traços (stroke order) para kanjis
- Suporte a áudio com pronúncia nativa (text-to-speech ou gravações)
- Modo escuro e suporte a PWA para uso offline

---

## Créditos

As ilustrações do quiz de imagens (`frontend/public/illustrations/`) são do projeto
[Fluent Emoji](https://github.com/microsoft/fluentui-emoji) da Microsoft, no estilo Flat,
distribuídas sob a licença MIT. O texto completo da licença está em
`frontend/public/illustrations/LICENSE.txt`.
