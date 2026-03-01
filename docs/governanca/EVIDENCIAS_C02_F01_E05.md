# EVIDÊNCIAS — C02F01E05 · Mapa de cache e rate limit

## Escopo auditado
- `worker/src/cache/index.js`
- `worker/src/middleware/rateLimit.js`
- `worker/src/handlers/metrics.js`
- `worker/src/index.js`

## Mapa de cache
- Cache de busca em KV implementado em `worker/src/cache/index.js`:
  - `getCachedSearch(env, cacheKey)`
  - `setCachedSearch(env, cacheKey, data, ttlSeconds)`
- Prefixo de chave: `search:v5:`.
- TTL padrão: 300s (pode ser sobrescrito).

## Mapa de rate limit
- Implementado em `worker/src/middleware/rateLimit.js` via `checkRateLimit`.
- Estratégia híbrida:
  - KV (`KV_CACHE`) quando disponível.
  - fallback em memória (`Map`) quando KV indisponível/erro.
- Chave composta por tenant + IP + API key parcial + bucket temporal.
- Limites parametrizados por env (`RATE_LIMIT_REQUESTS`, `RATE_LIMIT_WINDOW_SECONDS`).

## Integração no roteador
- `POST /search` aplica `checkRateLimit` em `worker/src/index.js`.
- Em limite excedido retorna `429` com header `Retry-After`.

## Métricas relacionadas
- `worker/src/handlers/metrics.js` expõe métricas (`GET /metrics`) e reset admin (`POST /metrics/reset`).
- Em rate limit, o roteador incrementa métrica `rateLimited`.

## Status técnico observado
- Cache + rate limit estão implementados e integrados no fluxo de busca.
- **Status técnico:** 🟢 para o escopo de mapeamento.

## Status de execução no checklist
- **Checklist CODEX:** 🔴 → 🟡 (aguardando validação JULES).

## Gaps identificados
- Sem gap crítico para o objetivo de mapeamento.
