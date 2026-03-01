# EVIDÊNCIAS — C02F01E09 · Mapa de testes existentes

## Escopo auditado
- `worker/src/__tests__/scoring.test.js`
- `worker/package.json`

## Inventário de testes
- Arquivo de testes existente: `worker/src/__tests__/scoring.test.js`.
- Cobertura observada no arquivo:
  - `scoreJob` (faixa de score 0-100)
  - `dedupeJobs`
  - `filterJobs`
  - `seniorityScore`

## Comandos de teste
- `worker/package.json` define script:
  - `npm test` → `vitest --environment miniflare`

## Status técnico observado
- Base de testes unitários existe e executa via Vitest/Miniflare.
- Escopo ainda concentrado em scoring/filtering (não cobre todo o roteador/handlers).
- **Status técnico:** 🟡 (existe, mas cobertura parcial).

## Status de execução no checklist
- **Checklist CODEX:** 🔴 → 🟡 (aguardando validação JULES).
