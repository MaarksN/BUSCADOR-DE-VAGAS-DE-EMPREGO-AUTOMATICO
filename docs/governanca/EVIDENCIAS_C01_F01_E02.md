# EVIDÊNCIAS — C01F01E02 · Mapa de endpoints do Worker

## Objetivo
Mapear as rotas e handlers reais do Worker (`worker/src/index.js` e `worker/src/handlers`) para auditoria e fundamentos do sistema.

## Evidências coletadas (paths + trechos)

### 1) Router principal e dispatch por método — `worker/src/index.js`
- O Worker expõe `fetch(request, env)` e organiza as rotas no objeto `routes` categorizadas por método HTTP (`GET`, `POST`, `DELETE`).
- A resolução da rota é feita pela função `matchRoute` que suporta match exato e via regex.

### 2) Endpoints GET mapeados
- `GET /health` → `handleHealth`
- `GET /version` → `handleVersion`
- `GET /config` → `handleConfig`
- `GET /sites` → `handleSites`
- `GET /sample-request` → `handleSample`
- `GET /metrics` → `handleMetrics`
- `GET /favorites` → `handleGetFavorites`

### 3) Endpoints POST mapeados
- `POST /metrics/reset` → `handleMetricsReset`
- `POST /normalize` → `handleNormalize`
- `POST /validate` → `handleValidate`
- `POST /favorites` → `handlePostFavorites`
- `POST /search` → `handleSearch`

### 4) Endpoints DELETE mapeados
- `DELETE /favorites` → `handleDeleteFavorite`
- `DELETE /favorites/:id` (via regex `/^\/favorites\/([^/]+)$/`) → `handleDeleteFavorite`

### 5) Handlers mapeados em `worker/src/handlers/`
- `health.js`
- `version.js`
- `config.js`
- `sites.js`
- `sample.js`
- `metrics.js`
- `normalize.js`
- `validate.js`
- `search.js`
- `favorites.js`
- `shared.js`

## Classificação do item
- **Status anterior:** 🔴
- **Status encontrado no código:** Todos os endpoints e handlers listados e necessários para o roteamento atual existem no projeto.
- **Novo status proposto:** 🟡 (aguardando validação CODEX).

## Gap identificado
- Nenhum gap estrutural identificado. Os endpoints requisitados foram devidamente implementados no repositório.

## Resultado esperado x resultado real
- O mapeamento dos endpoints foi criado com sucesso refletindo a realidade atual do código.

## Validação / evidência de execução
- Inspeção direta dos arquivos:
  - `worker/src/index.js`
  - `worker/src/handlers/*.js`

## Tratamento de erros
- Não houve bloqueios ou erros na coleta das informações.
