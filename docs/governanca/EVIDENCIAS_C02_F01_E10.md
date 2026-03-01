# EVIDÊNCIAS — C02F01E10 · Mapa de riscos e dívida

## Escopo auditado
- `worker/src/scrapers/index.js`
- `worker/src/middleware/cors.js`
- `worker/src/middleware/rateLimit.js`
- `worker/src/handlers/validate.js`
- `worker/src/services/searchService.js`
- `worker/src/metrics/index.js`

## Lista objetiva de riscos por módulo
1. **Scrapers (fragilidade upstream)**
   - Dependência de HTML/API de terceiros, suscetível a quebra por mudança externa.
   - Parte das fontes ainda em placeholder e não integradas ao `scraperMap`.

2. **CORS (integração cliente)**
   - Configuração permissiva/incorreta pode quebrar UI/extensão em produção.

3. **Rate limit (justiça e abuso)**
   - Estratégia KV + fallback memória pode variar comportamento em cenários sem KV.

4. **Validação de payload (contrato evolutivo)**
   - Necessidade de manter compatibilidade entre payload legado e moderno.

5. **Observabilidade (diagnóstico operacional)**
   - Métricas existem, porém testes de regressão para telemetria ainda limitados.

## Dívida técnica consolidada
- Ampliar cobertura de testes para handlers/rotas e cenários de erro.
- Completar integração dos scrapers ainda placeholders.
- Evoluir runbook operacional com cenários de degradação por upstream.

## Status técnico observado
- Riscos e dívidas mapeados com referência ao código real.
- **Status técnico:** 🟡 (mapeado, mas exige execução de mitigação em fases futuras).

## Status de execução no checklist
- **Checklist CODEX:** 🔴 → 🟡 (aguardando validação JULES).
