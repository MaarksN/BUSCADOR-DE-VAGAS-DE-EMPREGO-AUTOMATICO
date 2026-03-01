# EVIDÊNCIAS — C02F01E02 · Mapa de endpoints do Worker

## Objetivo
Mapear as rotas e handlers reais do Worker (`worker/src/index.js` + `worker/src/handlers`) para classificar o estado do item C02/F01/E02 na aba CODEX.

## Evidências coletadas (paths + trechos)

### 1) Router principal e dispatch por método — `worker/src/index.js`
- O Worker expõe `fetch(request, env)` e organiza rotas por método (`GET`, `POST`, `DELETE`) no objeto `routes`.
- A função `matchRoute` resolve rota literal e rota regex, incluindo `DELETE /^\/favorites\/([^/]+)$/`.

### 2) Endpoints GET mapeados
- `GET /health` → `handleHealth`
- `GET /version` → `handleVersion`
- `GET /config` → `handleConfig`
- `GET /sites` → `handleSites`
- `GET /sample-request` → `handleSample`
- `GET /metrics` → `handleMetrics` (envolto por `routeJson`)
- `GET /favorites` → `handleGetFavorites` (envolto por `routeJson`)

### 3) Endpoints POST mapeados
- `POST /metrics/reset` → `handleMetricsReset` (com autenticação `requireAdminAuth`)
- `POST /normalize` → `handleNormalize`
- `POST /validate` → `handleValidate`
- `POST /favorites` → `handlePostFavorites`
- `POST /search` → `handleSearch` (com `requireJson` + `checkRateLimit`)

### 4) Endpoints DELETE mapeados
- `DELETE /favorites` → `handleDeleteFavorite`
- `DELETE /favorites/:id` (regex) → `handleDeleteFavorite` com parâmetro extraído da URL

### 5) Cobertura de handlers na árvore do projeto
- Arquivos de handlers confirmados em `worker/src/handlers/`: `health.js`, `version.js`, `config.js`, `sites.js`, `sample.js`, `metrics.js`, `normalize.js`, `validate.js`, `search.js`, `favorites.js`, `shared.js`.

## Classificação do item
- **Status anterior:** 🔴.
- **Status encontrado no código:** endpoints e handlers solicitados existem e estão roteados no runtime real.
- **Novo status proposto:** 🟡 (execução CODEX concluída, aguardando validação JULES para promoção a 🟢).

## Gap identificado
- Não foi encontrado gap funcional no mapeamento de rotas/handlers pedido pelo item.
- O gap pendente era de governança de execução: documentação de evidência + atualização de checklist/log.

## Resultado esperado x resultado real
- Resultado esperado atendido: mapa de endpoints e handlers consolidado com base no código real.

## Validação / evidência de execução
- Inspeção direta dos arquivos:
  - `worker/src/index.js`
  - `worker/src/handlers/health.js`
  - `worker/src/handlers/version.js`
  - `worker/src/handlers/metrics.js`
  - `worker/src/handlers/search.js`
  - `worker/src/handlers/validate.js`
  - `worker/src/handlers/normalize.js`
  - `worker/src/handlers/favorites.js`

## Tratamento de erros
- Não houve erro de path inexistente nos arquivos-alvo deste item.
