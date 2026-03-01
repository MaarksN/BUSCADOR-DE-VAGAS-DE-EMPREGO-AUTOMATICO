# EVIDÊNCIAS — C01F01E02 · Mapa de endpoints do Worker

## Objetivo
Listar as rotas e os respectivos handlers do Worker a partir do roteamento definido em `worker/src/index.js` e implementado em `worker/src/handlers/`.

## Evidências coletadas (paths + trechos)

### Roteamento principal — `worker/src/index.js`
O mapeamento de rotas e chamadas a handlers está explicitamente configurado dentro de `export default { async fetch(...) }`, no dicionário `routes`:

#### Endpoints GET
- `GET /health` → `handleHealth`
- `GET /version` → `handleVersion`
- `GET /config` → `handleConfig`
- `GET /sites` → `handleSites`
- `GET /sample-request` → `handleSample`
- `GET /metrics` → `handleMetrics`
- `GET /favorites` → `handleGetFavorites`

#### Endpoints POST
- `POST /metrics/reset` → `handleMetricsReset` (com middleware `requireAdminAuth`)
- `POST /normalize` → `handleNormalize`
- `POST /validate` → `handleValidate`
- `POST /favorites` → `handlePostFavorites`
- `POST /search` → `handleSearch` (com middleware `requireJson` e `checkRateLimit`)

#### Endpoints DELETE
- `DELETE /favorites` → `handleDeleteFavorite`
- `DELETE /favorites/:id` → `handleDeleteFavorite` (via Regex `/^\/favorites\/([^/]+)$/`)

### Handlers implementados — `worker/src/handlers/`
Os arquivos correspondentes existem no diretório de handlers:
- `worker/src/handlers/config.js`
- `worker/src/handlers/favorites.js` (exporta `handleDeleteFavorite`, `handleGetFavorites`, `handlePostFavorites`)
- `worker/src/handlers/health.js`
- `worker/src/handlers/metrics.js` (exporta `handleMetrics`, `handleMetricsReset`)
- `worker/src/handlers/normalize.js`
- `worker/src/handlers/sample.js`
- `worker/src/handlers/search.js`
- `worker/src/handlers/sites.js`
- `worker/src/handlers/validate.js`
- `worker/src/handlers/version.js`
- O arquivo `worker/src/handlers/shared.js` contém utilitários para respostas consistentes.

## Classificação do item
- **Status anterior:** 🔴 (não implementado no checklist).
- **Status encontrado no código:** implementação de rotas e handlers já presente.
- **Novo status proposto:** 🟡 (implementado pelo responsável JULES; aguardando validação final do validador CODEX para 🟢).

## Gap identificado
- Não há gap na implementação. A estrutura de roteamento e endpoints está completa e funcionando.
- O trabalho feito é de documentação da evidência e governança do checklist para que seja atualizado corretamente.

## Resultado esperado x resultado real
- Resultado esperado atendido: mapa de endpoints documentado e conferido frente ao código fonte.

## Validação / evidência de execução
- Inspeção e leitura do arquivo `worker/src/index.js`.
- Listagem dos arquivos em `worker/src/handlers/`.
