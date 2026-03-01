# EVIDÊNCIAS — C02F01E04 · Mapa de scoring e ranking

## Escopo auditado
- `worker/src/scoring/index.js`
- `worker/src/scoring/keywords.js`
- `worker/src/scoring/location.js`
- `worker/src/scoring/recency.js`
- `worker/src/scoring/salary.js`
- `worker/src/scoring/seniority.js`
- `worker/src/scoring/boosts.js`

## Catálogo de componentes de scoring
- `keywordScore`: pontos por matches de tokens da query em título/descrição/tags.
- `locationScore`: boost por aderência da localização da vaga com locations solicitadas.
- `recencyScore`: boost por recência com faixas (<=3, <=7, <=30 dias).
- `seniorityScore`: boost/penalidade por aderência de senioridade inferida.
- `salaryScore`: boost/penalidade por aderência de faixa salarial esperada.
- `extraBoosts`: boosts adicionais (ex.: remoto e idioma).

## Fórmula de ranking observada
`scoreJob` combina os módulos acima e calcula `score` final limitado entre 0 e 100.
Também retorna `scoreBreakdown` com os campos principais para diagnóstico e ordenação.

## Status técnico observado
- Estrutura de scoring modular implementada e utilizada no pipeline.
- Ranking com `scoreBreakdown` disponível no objeto final de vaga.
- **Status técnico:** 🟢 para o mapa solicitado.

## Status de execução no checklist
- **Checklist CODEX:** 🔴 → 🟡 (regra de fluxo, aguardando validação JULES para 🟢).

## Gaps identificados
- Sem gap crítico para o escopo de mapeamento solicitado nesta execução.
