# EVIDÊNCIAS — C01F01E03 · Mapa de scrapers e fontes

## Objetivo
Catalogar os scrapers disponíveis em `worker/src/scrapers` (catho, gupy, indeed, linkedin, infojobs, remotivo, arbeitnow).

## Evidências coletadas (paths + trechos)

### 1) Router de scrapers — `worker/src/scrapers/index.js`
- Exporta o objeto `scrapers` e a função principal `runAllScrapers(params, options)`.
- Gerencia os timeouts com suporte para `AbortController`.
- Implementa paralelização (`Promise.allSettled`) e deduplicação unificada via `dedupeJobs`.
- Captura métricas por provedor, registrando sucesso ou erro na KV `metrics`.

### 2) Scrapers Implementados em `worker/src/scrapers/`
- `catho.js`: Implementação funcional (retorna array de teste/mock logado).
- `gupy.js`: Implementação base (retorna array vazio com aviso "Gupy scraper not yet implemented").
- `indeed.js`: Implementação mock.
- `linkedin.js`: Implementação mock com fallback.
- `infojobs.js`: Estrutura com log e mock de resposta.
- `remotivo.js`: Estrutura de base/placeholder.
- `arbeitnow.js`: Scraper funcional mapeando o RSS feed real (`https://www.arbeitnow.com/api/job-board-api`).
- `vagas.com.js`: Implementação base.

### 3) Ferramentas compartilhadas — `worker/src/scrapers/shared.js`
- Exporta utilitários auxiliares aos scrapers (ex. `randomDelay`, `parseHtml`).

## Classificação do item
- **Status anterior:** 🔴
- **Status encontrado no código:** Os arquivos dos provedores citados estão presentes, embora a maioria seja mockup/placeholder para implementação futura. O orquestrador (`index.js`) é maduro, funcional e lidando com métricas/tempos.
- **Novo status proposto:** 🟡 (aguardando validação CODEX).

## Gap identificado
- Os arquivos foram criados, mas a maioria deles (exceto arbeitnow) retorna mocks ou respostas dummy.
- A orquestração (Circuit Breaker) atende bem a necessidade atual.

## Resultado esperado x resultado real
- O catálogo dos scrapers foi documentado e conferido no código real com sucesso.

## Validação / evidência de execução
- Inspeção direta dos arquivos:
  - `worker/src/scrapers/index.js`
  - `worker/src/scrapers/*.js`

## Tratamento de erros
- N/A
