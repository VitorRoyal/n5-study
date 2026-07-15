# N5 Study

> Aplicação web para estudo do japonês, focada na preparação para o exame JLPT N5. Reúne hiragana, katakana e kanjis em um formato de prática interativa.

---

## Tecnologias

- React 19
- TypeScript
- Vite
- React Router DOM
- styled-components

---

## Estrutura de Pastas

```
n5-study/
├── src/
│   ├── components/          # Componentes de UI reutilizáveis
│   │   ├── BackButton/
│   │   ├── Card/
│   │   └── Navbar/
│   ├── modules/              # Telas da aplicação
│   │   ├── Home/              # Tela inicial, escolha do modo de estudo
│   │   ├── Flashcards/        # Quiz de flashcards (hiragana, katakana, kanji)
│   │   └── Study/             # Área de estudo livre
│   ├── styles/                # Estilos e tokens globais (cores, GlobalStyles)
│   ├── App.tsx                # Definição das rotas
│   └── main.tsx                # Ponto de entrada da aplicação
├── public/
└── index.html
```

| Camada | Responsabilidade |
|--------|-----------------|
| `components/` | Elementos de interface compartilhados entre telas |
| `modules/<Nome>/index.tsx` | Componente principal da tela |
| `modules/<Nome>/style.ts` | Estilos específicos da tela (styled-components) |
| `modules/Flashcards/data.ts` | Base de dados de hiragana, katakana e kanjis do N5 |
| `styles/` | Paleta de cores e estilos globais compartilhados |

---

## Como Instalar e Rodar

### Pré-requisitos

- Node.js 20+

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
npm run preview
```

---

## Principais Funcionalidades

- Quiz de flashcards com 5 cards simultâneos, alternando entre hiragana, katakana e kanji
- Verificação automática da resposta digitada, com avanço para o próximo card ao acertar
- Card com efeito de flip que revela a leitura e o significado (por clique, para consulta, ou automaticamente ao acertar)
- Contador de acertos em tempo real
- Base de vocabulário do N5: gojuon completo (hiragana e katakana, incluindo dakuten/handakuten) e mais de 100 kanjis com leitura e significado

---

## Em Breve

O projeto está em evolução e os próximos módulos planejados incluem:

- Completar frases (preencher lacunas com a palavra correta)
- Compreensão auditiva: ouvir áudios e responder o que foi dito
- Tradução de frases e textos curtos
- Banco de frases de exemplo para contextualizar o vocabulário estudado

---

## Ideias para Próximos Passos

Sugestões de funcionalidades que podem agregar valor ao projeto:

- Repetição espaçada (spaced repetition/SRS), priorizando cards errados com mais frequência
- Tela de estatísticas e progresso por categoria (percentual de acerto, cards dominados, tempo de estudo)
- Modo de revisão dedicado aos erros mais recentes
- Simulados no formato do exame JLPT N5 (leitura, gramática, vocabulário)
- Modo múltipla escolha, como alternativa à digitação
- Prática de escrita com ordem dos traços (stroke order) para kanjis
- Suporte a áudio com pronúncia nativa (text-to-speech ou gravações)
- Persistência do progresso (local storage ou conta de usuário)
- Modo escuro
- Suporte a PWA para uso offline
