# EVIDÊNCIAS — C02F01E02 · Mapa de endpoints do Worker

## Escopo auditado
- `worker/src/index.js`
- `worker/src/handlers/config.js`
- `worker/src/handlers/favorites.js`
- `worker/src/handlers/health.js`
- `worker/src/handlers/metrics.js`
- `worker/src/handlers/normalize.js`
- `worker/src/handlers/sample.js`
- `worker/src/handlers/search.js`
- `worker/src/handlers/sites.js`
- `worker/src/handlers/validate.js`
- `worker/src/handlers/version.js`

## Mapa de rotas e handlers

### GET
- `/health` → `handleHealth`
- `/version` → `handleVersion`
- `/config` → `handleConfig`
- `/sites` → `handleSites`
- `/sample-request` → `handleSample`
- `/metrics` → `handleMetrics` (via `routeJson`)
- `/favorites` → `handleGetFavorites` (via `routeJson`)

### POST
- `/metrics/reset` → `handleMetricsReset` (com `requireAdminAuth`)
- `/normalize` → `handleNormalize`
- `/validate` → `handleValidate`
- `/favorites` → `handlePostFavorites`
- `/search` → `handleSearch` (com `requireJson` + `checkRateLimit`)

### DELETE
- `/favorites` → `handleDeleteFavorite`
- `/favorites/:id` (regex `^/favorites/([^/]+)$`) → `handleDeleteFavorite` com `favoriteId`

## Evidência de implementação real
- O roteamento HTTP por método (`GET`, `POST`, `DELETE`) está implementado em `worker/src/index.js` com dispatch para handlers específicos.
- Todos os handlers referenciados no roteamento existem em `worker/src/handlers/*.js` e exportam as funções usadas no dispatcher.
- O retorno para rota inexistente responde `404` com `problem+json` padronizado por `withProblem`.

## Classificação do status
- **Status técnico observado no código:** 🟢 (rotas e handlers implementados e conectados).
- **Status do checklist após execução CODEX:** 🟡 (movido de 🔴 para 🟡 conforme regra de fluxo, aguardando validação do JULES para promoção a 🟢).

## Gaps identificados
- Nenhum gap funcional no mapeamento de endpoints/handlers para o escopo desta execução.
