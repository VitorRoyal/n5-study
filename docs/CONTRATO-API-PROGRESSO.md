# Contrato da API de Progresso — Fase 1

> Este é o contrato acordado entre backend e frontend. As duas frentes podem ser
> desenvolvidas em paralelo desde que ambas respeitem exatamente o que está aqui.
> Base de todas as rotas: `http://localhost:8080/api/v1`
> Todas exigem o header `Authorization: Bearer <token>`.

---

## Enum compartilhado

`TipoConteudo`:

```
HIRAGANA | KATAKANA | KANJI | IMAGEM | FRASE
```

---

## 1. Registrar uma resposta

Chamado a cada acerto ou erro, em qualquer treino.

```
POST /progresso/respostas
```

Request:

```json
{
  "tipoConteudo": "KANJI",
  "itemId": "kj-hito",
  "acertou": true
}
```

Response `200`:

```json
{
  "id": 1842,
  "tipoConteudo": "KANJI",
  "itemId": "kj-hito",
  "acertou": true,
  "respondidoEm": "2026-11-26T14:22:10.119"
}
```

---

## 2. Resumo do progresso

Alimenta os quatro cards de métrica e as medalhas da tela Início.

```
GET /progresso/resumo
```

Response `200`:

```json
{
  "totalAcertos": 248,
  "totalErros": 37,
  "palavrasRevisadas": 112,
  "sequenciaAtual": 7,
  "melhorSequencia": 14,
  "porTipo": [
    { "tipoConteudo": "KANJI", "acertos": 120, "erros": 20, "revisados": 46 },
    { "tipoConteudo": "HIRAGANA", "acertos": 80, "erros": 9, "revisados": 40 }
  ]
}
```

Regras:

- `palavrasRevisadas` conta **itens distintos** já respondidos, não o total de respostas.
- `sequenciaAtual` conta acertos consecutivos a partir da resposta mais recente para trás.
  Qualquer erro zera.
- `melhorSequencia` é a maior sequência já alcançada pelo usuário.
- `porTipo` traz apenas os tipos que já têm ao menos uma resposta.

---

## 3. Onde o usuário parou

Alimenta o bloco "Continue de onde parou".

```
GET /progresso/sessao
```

Response `200`:

```json
{
  "tipoConteudo": "KANJI",
  "itemId": "kj-hito",
  "posicao": 46,
  "totalItens": 110,
  "atualizadoEm": "2026-11-26T14:22:10.119"
}
```

Response `204` quando o usuário ainda não começou nenhum treino. O frontend deve tratar
esse caso mostrando um convite para iniciar, em vez do bloco de retomada.

```
PUT /progresso/sessao
```

Request:

```json
{
  "tipoConteudo": "KANJI",
  "itemId": "kj-hito",
  "posicao": 46,
  "totalItens": 110
}
```

Response `200`: mesmo corpo do GET.

Existe no máximo **uma** sessão por usuário: o PUT sobrescreve a anterior.

---

## 4. Erros

Mesmo formato já usado pela API de autenticação:

```json
{
  "status": 400,
  "mensagem": "Dados invalidos",
  "detalhes": ["O tipo de conteudo e obrigatorio"],
  "momento": "2026-11-26T14:22:10.119"
}
```

---

## 5. Medalhas nesta fase

A tabela de medalhas é **Fase 3**. Nesta fase o frontend deriva as quatro medalhas da
tela Início a partir do `/progresso/resumo`, sem endpoint próprio:

| Medalha | Condição |
|---|---|
| Primeiro passo | `totalAcertos >= 1` |
| Em sequência | `melhorSequencia >= 5` |
| Imparável | `melhorSequencia >= 10` |
| Centenário | `totalAcertos >= 100` |

Quando a Fase 3 chegar, troca-se a derivação local por um endpoint sem mexer no layout.
