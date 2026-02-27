# Buscador de Vagas de Emprego Automático

Projeto multi-stack para buscar vagas em diferentes fontes, com três componentes principais:

- **`worker/`**: API serverless (Cloudflare Worker) que agrega, filtra e pontua vagas.
- **`online-app/`**: interface web estática para consulta e filtros.
- **`chrome-extension/`**: extensão para busca rápida e monitoramento.

## Estrutura do repositório

```text
.
├── chrome-extension/          # Extensão Chrome (manifest v3)
├── online-app/                # Front-end estático (HTML/CSS/JS)
├── worker/                    # API Node.js/Cloudflare Worker
│   ├── src/
│   ├── wrangler.toml
│   └── .env.example
├── job_finder.py              # Script Python standalone
├── requirements.txt           # Sem libs externas obrigatórias
├── DEPLOY.md
└── CHECKLIST-PLANOS-20.md
```

## Requisitos

- **Node.js 20+** (recomendado para `wrangler`, `vitest` e `miniflare`)
- **npm 10+**
- **Python 3.10+** (para `job_finder.py`)

## Instalação

### 1) Variáveis de ambiente

```bash
cp .env.example .env
cp worker/.env.example worker/.env
```

> Ajuste os valores conforme seu ambiente (especialmente `WORKER_URL` e tokens administrativos).

### 2) Dependências do Worker

```bash
cd worker
npm install
```

## Execução local

### Worker API (modo desenvolvimento)

```bash
cd worker
npm run dev
```

API local padrão: `http://127.0.0.1:8787`

### App web estático

Você pode abrir `online-app/index.html` direto no navegador, mas o fluxo recomendado é servir localmente:

```bash
python -m http.server 5500
```

Depois acesse:

- `http://127.0.0.1:5500/online-app/index.html`

### Extensão Chrome

1. Acesse `chrome://extensions`
2. Ative **Modo do desenvolvedor**
3. Clique em **Carregar sem compactação**
4. Selecione a pasta `chrome-extension/`

## Build e testes

### Build (validação de deploy do Worker)

```bash
cd worker
npm run build
```

### Testes

```bash
cd worker
npm test
```

## Script Python

`job_finder.py` funciona com biblioteca padrão do Python (sem dependências externas obrigatórias):

```bash
python job_finder.py
```

## Endpoints principais

- `GET /health`
- `GET /version`
- `GET /config`
- `GET /sites`
- `GET /metrics`
- `POST /search`
- `POST /validate`
- `POST /normalize`

## Próximos passos recomendados

1. Configurar CI (lint + testes do worker em pull requests).
2. Padronizar contratos da API em OpenAPI/JSON Schema versionado.
3. Adicionar smoke tests de integração (`/health` + `/search`) em ambiente local.
