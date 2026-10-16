# Bankai — Sistema de Logística (TCC)

Rastreamento e controle de produtos, armazéns, transportadoras, veículos e entregas.
Front-end em React + Vite e back-end em Node.js + Express com PostgreSQL (Neon).

## Estrutura

```
.
├── index.html                        página única; carrega src/main.jsx
├── public/                           arquivos servidos como estão (favicon, imagens)
├── src/                              front-end React
│   ├── main.jsx                      ponto de entrada
│   ├── App.jsx                       navegação entre as telas
│   ├── index.css                     estilos globais
│   ├── pages/                        uma tela por arquivo
│   │   ├── Inicio.jsx                landing page (junta as seções abaixo)
│   │   ├── Cadastro.jsx              grava o usuário no banco
│   │   ├── Login.jsx                 confere email e senha no banco
│   │   └── Dashboard.jsx             painel após o login
│   ├── components/
│   │   ├── Reveal.jsx                animação de entrada ao rolar a página
│   │   └── landing/                  LogisticsHero, Vantagens, ComoFunciona, Planos, Footer
│   └── services/api.js               chamadas do front para o back-end
├── sql/schema.sql                    criação das tabelas (pode rodar mais de uma vez)
└── sistema-logistica/backend/        API Express
    └── src/  routes/ → controllers/ → models/ → database/connection.js
```

Fluxo das telas: **início → cadastro ⇄ login → dashboard → sair**.

## Como rodar

1. **Banco:** rode `sql/schema.sql` no PostgreSQL (no Neon, pelo SQL Editor).
2. **Back-end** (porta 3000):
   ```bash
   cd sistema-logistica/backend
   cp .env.example .env      # preencha DATABASE_URL com a string do Neon
   npm install
   npm start
   ```
   `npm run test:db` testa só a conexão com o banco.
3. **Front-end** (porta 5173), em outro terminal, na raiz:
   ```bash
   npm install
   npm run dev
   ```
   Se a API estiver em outro endereço, crie `.env` na raiz com `VITE_API_URL=https://...`.

## API

Todas as entidades têm as mesmas cinco rotas:

| Método | Caminho | Ação |
|---|---|---|
| GET | `/<entidade>` | lista |
| GET | `/<entidade>/:id` | busca por id |
| POST | `/<entidade>` | cria |
| PUT | `/<entidade>/:id` | atualiza (só os campos enviados) |
| DELETE | `/<entidade>/:id` | remove |

Entidades: `usuarios`, `produtos`, `armazens`, `transportadoras`, `veiculos`,
`entregas`, `movimentacoes`, `rastreamento`.

Rotas extras:
- `POST /usuarios/login` — `{ "login": "email", "senha": "..." }`
- `GET /rastreamento/entrega/:entrega_id` — histórico de uma entrega

Respostas de erro: `400` dados ou id inválidos, `404` não encontrado,
`409` registro duplicado (login, CNPJ, placa).

Exemplos de chamadas em PowerShell estão em `lembrar.txt`.
