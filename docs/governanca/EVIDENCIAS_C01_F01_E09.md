# EVIDÊNCIAS — C01F01E09 · Mapa de testes existentes

## Objetivo
Inventariar a estrutura de testes existente no Cloudflare Worker, focando em comandos, frameworks utilizados e na cobertura atual identificável.

## Evidências coletadas (paths + trechos)

### 1. Ferramental de Teste e Comandos (`worker/package.json`)
A stack de testes escolhida foi o `vitest` integrado ao ambiente mockado da cloudflare via `miniflare`. O script principal de execução é `npm test` ou `npm run test` com a seguinte definição:
```json
"scripts": {
  "test": "vitest --environment miniflare"
}
```
Dependências instaladas: `vitest`, `miniflare`, `vitest-environment-miniflare`.

### 2. Suíte de Testes Identificada (`worker/src/__tests__/scoring.test.js`)
Existe um arquivo base implementando testes unitários e de integração parciais para os módulos mais críticos do core business de buscas (Scoring, Filtering e Deduplication):
- **Mocking Isolado:** Faz mock do módulo de scrapers (`runAllScrapers`) para não realizar HTTP requests reais durante os testes e focar apenas na mecânica interna de rankeamento.
- **Test Cases Identificados:**
  1. Cálculo de `scoreJob` com payload completo (verificando range [0-100]).
  2. Utilitário `dedupeJobs` validando aglutinação de vagas duplicadas mantendo o maior score.
  3. Comportamento de exclusão em `filterJobs` (ex: `remoteOnly` filtrando vagas não remotas).
  4. Penalidade e Bonificação isolada testada pelo `seniorityScore` (-20 vs +15 pontos).

## Classificação do item
- **Status anterior:** 🔴 (não implementado no checklist).
- **Status encontrado no código:** O worker possui uma estrutura de vitest com miniflare instalada e operacional, contando com 4 asserções no core de scoring e filtering.
- **Novo status proposto:** 🟡 (implementado pelo responsável JULES; aguardando validação final do validador CODEX para 🟢).

## Gap identificado
- Faltam testes unitários explícitos para handlers REST (`handleSearch`, `handleMetrics`), middlewares (`rateLimit.js`, `cors.js`) e parsers específicos dos adaptadores de scrapers (indeed, linkedin). A estrutura atual cobre apenas o motor de `scoring`. A base está posta, mas a cobertura é pequena.

## Resultado esperado x resultado real
- Resultado esperado atendido: mapa de testes mapeado e inventariado com as gaps arquiteturais descritas acima documentadas.

## Validação / evidência de execução
- Análise de `worker/package.json`.
- Leitura estrutural do arquivo de teste `worker/src/__tests__/scoring.test.js`.