# Nihon GO — Roadmap de Interface

> Documento de discussão. Nada aqui foi implementado ainda. O objetivo é fechar o padrão
> visual e de navegação antes de escrever código, para não refazer tela depois.

---

## 1. Onde estamos hoje

### O que já funciona

| Área | Situação |
|---|---|
| Autenticação | Login, cadastro, JWT, senha com hash BCrypt, rotas protegidas |
| Flashcards | 4 abas: Hiragana, Katakana, Kanji, Imagens |
| Frases | Completar lacuna, com tradução palavra a palavra |
| Banco de conteúdo | 71 hiragana, 71 katakana, 110 kanji, 50 palavras ilustradas, 10 frases |
| Infra | PostgreSQL + API em Docker, frontend em Vite |

### Navegação atual

```
/login        Tela de entrada
/             Home: dois cards (Flashcards, Estudo)
/flashcards   Abas na navbar: Hiragana | Katakana | Kanjis | Imagens
/study        Completar frases
```

### O problema central

A Home de hoje é um **menu**, não um **painel**. Ela não sabe nada sobre você: não mostra
o que você estudou, onde parou, nem o quanto evoluiu. Abrir o app não dá nenhuma sensação
de continuidade.

E tem uma limitação técnica por trás disso que precisa ficar explícita:

> **Hoje nenhum progresso é salvo.** O contador "Acertos: N" vive em memória do React.
> Recarregar a página zera tudo. O banco só tem a tabela `usuario`.

Ou seja: a tela inicial que você descreveu não é só trabalho de frontend. Ela depende de
o backend passar a registrar cada resposta. Isso muda a ordem das fases lá embaixo.

---

## 2. A visão

Uma tela inicial que responde três perguntas em menos de 5 segundos:

1. **Quem sou eu aqui?** — "Olá, Vitor"
2. **Como estou indo?** — acertos, erros, palavras revisadas, sequência
3. **O que faço agora?** — continuar de onde parou, ou escolher um treino

Com um menu lateral permanente que torna todo o conteúdo alcançável em um clique.

---

## 3. Navegação proposta

```
字  Nihon GO

ESTUDAR
  Início                         <- ativo
  Flashcards            (abre)
      Hiragana
      Katakana
      Kanji
      Palavras com imagem
  Provas                (abre)
      Preparação JLPT N5
      Preparação JLPT N4
  Frases

MINHA CONTA
  Meu progresso
  Medalhas
  Sair
```

**Decisões embutidas aqui:**

- **Flashcards vira um grupo, não uma tela com abas.** Hoje você entra em `/flashcards` e
  troca de aba. Na proposta, cada tipo é uma rota própria (`/flashcards/kanji`). Vantagem:
  dá para linkar direto, o menu mostra onde você está, e o "continue de onde parou" consegue
  te devolver exatamente ao treino certo.
- **"Provas" nasce vazia.** JLPT N5 e N4 ainda não existem. Aparecem no menu desde já para
  dar a dimensão do produto, mas com estado "em breve" — nunca um link quebrado.
- **"Frases" sai de dentro de "Estudo".** O nome "Estudo" era genérico demais; o módulo faz
  uma coisa só.

---

## 4. Anatomia da tela Início

De cima para baixo:

**1. Saudação**
`Olá, Vitor` + `O que você gostaria de estudar hoje?`

**2. Métricas** — quatro números:

| Métrica | O que conta |
|---|---|
| Acertos | Total de respostas corretas |
| Erros | Total de respostas erradas |
| Palavras revisadas | Cards distintos já vistos |
| Sequência atual | Acertos seguidos sem errar |

**3. Continue de onde parou**
O último treino aberto, com o tipo, o progresso e um botão para retomar.

**4. Medalhas**
As conquistas já obtidas, e a próxima ainda bloqueada — ver o que falta é o que puxa a
pessoa de volta.

**5. Atalhos** (dependendo do esboço escolhido)
Entrada direta para cada tipo de flashcard.

---

## 5. Sistema de medalhas

Proposta inicial, para discussão:

| Medalha | Critério |
|---|---|
| Primeiro passo | Primeira resposta correta |
| Em sequência | 5 acertos seguidos |
| Imparável | 10 acertos seguidos |
| Gojuon | Todos os hiragana revisados ao menos uma vez |
| Katakana completo | Todos os katakana revisados |
| Centenário | 100 acertos no total |
| Constância | Estudou em 7 dias diferentes |

Dois tipos convivendo: **sequência** (intensidade numa sessão) e **cobertura** (progresso de
longo prazo). Só sequência vicia mas não ensina; só cobertura não dá adrenalina.

---

## 6. Os três esboços

Três direções visuais, da mais convencional à mais autoral. Todas usam a tipografia e a
paleta que o app já tem — Shippori Mincho nos títulos e caracteres, Zen Kaku Gothic New no
corpo, fundo washi e selo vermelho.

| Esboço | Ideia | Melhor se... |
|---|---|---|
| **A — Painel** | Cards de métrica em linha, igual a um dashboard clássico | você quer informação densa e familiar |
| **B — Foco na ação** | O "continuar de onde parou" domina a tela; métricas viram faixa fina | você quer voltar a estudar em 1 clique |
| **C — Selos** | Coluna central estreita, métricas como selos circulares | você quer que o app não pareça um sistema corporativo |

Arquivos em `docs/mockups/`. Abra no navegador para ver em tamanho real.

**O que precisa ser decidido olhando eles:**

1. Densidade: tudo à vista (A) ou hierarquia forte (B/C)?
2. O menu lateral fica sempre aberto ou recolhe?
3. As métricas são cartões retangulares (A/B) ou selos (C)?

---

## 7. Fases sugeridas

A ordem importa: a tela do item 4 **não tem como existir de verdade** antes da fase 1.

### Fase 1 — Persistir progresso (backend)

Sem isso, qualquer número na tela inicial é decorativo.

- Tabela de respostas: usuário, item, tipo, acertou, data
- Tabela de sessão de estudo: onde parou, em qual treino
- Endpoints de registro e de resumo
- Frontend passa a enviar cada resposta

### Fase 2 — Layout e menu lateral

- Componente de layout com sidebar
- Flashcards viram rotas próprias por tipo
- Home vira painel, consumindo os dados da fase 1

### Fase 3 — Medalhas

- Tabela de conquistas e regras de avaliação
- Exibição na Home e numa tela própria

### Fase 4 — Provas JLPT

- Formato de simulado com tempo e resultado
- N5 primeiro, N4 depois

---

## 8. Em aberto — preciso da sua opinião

1. **Nome do app.** Trocamos para "Nihon GO" só na tela de login. A navbar, o título da aba
   e o README ainda dizem "N5 Study". Troco em tudo?
2. **Erros contam para sempre?** Um contador de erros que só cresce desanima. Alternativa:
   mostrar taxa de acerto, ou só os erros da semana.
3. **Provas JLPT**: simulado cronometrado de verdade, ou um quiz mais leve?
4. **Estatística por tipo?** Faz sentido ver "Kanji: 62% de acerto" separado de hiragana?
5. **Modo escuro** — a referência que você mandou tem. Entra agora ou depois?
