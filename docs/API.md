# Contrato de API — AprovaMat PoC

> Este documento é o "acordo" entre quem faz o frontend e quem faz o backend.
> Enquanto o backend implementa de verdade, o frontend pode consumir um mock
> com exatamente este formato — quando o backend estiver pronto, só troca a
> URL, sem retrabalho.

Base URL (dev): `http://localhost:3001`

---

## POST /login

**Request**
```json
{
  "email": "mariana@teste.com",
  "senha": "123456"
}
```

**Response 200**
```json
{
  "token": "fake-jwt-token",
  "usuario": {
    "id": 1,
    "nome": "Mariana Souza"
  }
}
```

**Response 401**
```json
{ "erro": "E-mail ou senha inválidos" }
```

---

## GET /diagnostico

Retorna as questões do teste de nivelamento inicial.

**Response 200**
```json
{
  "questoes": [
    {
      "id": 1,
      "assunto": "Geometria",
      "enunciado": "Qual a área de um quadrado de lado 5cm?",
      "alternativas": ["10cm²", "20cm²", "25cm²", "30cm²"]
    }
  ]
}
```

---

## POST /diagnostico/responder

**Request**
```json
{
  "usuarioId": 1,
  "questaoId": 1,
  "alternativaEscolhida": "25cm²"
}
```

**Response 200**
```json
{
  "correta": true,
  "alternativaCorreta": "25cm²",
  "explicacao": "Área do quadrado = lado × lado = 5 × 5 = 25cm²."
}
```

---

## GET /evolucao/:usuarioId

**Response 200**
```json
{
  "percentualPorAssunto": [
    { "assunto": "Geometria", "percentual": 75 },
    { "assunto": "Funções", "percentual": 50 }
  ],
  "diasConsecutivos": 3
}
```

---

## Regras gerais

- Todas as respostas de erro seguem o formato `{ "erro": "mensagem" }`.
- Datas em ISO 8601 (`2026-08-17T00:00:00Z`), se necessário.
- Autenticação: enviar `Authorization: Bearer <token>` nas rotas protegidas
  (`/diagnostico/responder`, `/evolucao/:usuarioId`).
