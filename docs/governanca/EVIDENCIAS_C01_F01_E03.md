# EVIDÊNCIAS — C01F01E03 · Mapa de scrapers e fontes

## Objetivo
Catalogar os scrapers disponíveis e mapeados em `worker/src/scrapers/`, além de verificar o estado da implementação de cada fonte de dados.

## Evidências coletadas (paths + trechos)

### Ponto de Entrada (Router de Scrapers) — `worker/src/scrapers/index.js`
O roteamento dos scrapers é feito pela função `runAllScrapers`, que também aplica o pattern Circuit Breaker e faz controle de falhas (`timeoutPromise`, `loadCircuitState`, etc).

Os scrapers explicitamente mapeados para uso ativo são:
- `remotivo` -> `searchRemotivo`
- `arbeitnow` -> `searchArbeitnow`
- `indeed` -> `searchIndeed`
- `linkedin` -> `searchLinkedin`

### Fontes Ativas (Implementadas)
Estes arquivos contêm a lógica principal de scraping e foram importados em `index.js`:
- `worker/src/scrapers/arbeitnow.js`
- `worker/src/scrapers/indeed.js`
- `worker/src/scrapers/linkedin.js`
- `worker/src/scrapers/remotivo.js`

### Fontes Inativas (Placeholders / Stubs)
A pasta possui outros arquivos de scraper que constam apenas como esqueleto e retornam um array vazio:
```javascript
export async function searchPlaceholder() {
  return [];
}
```
Os seguintes arquivos possuem essa implementação:
- `worker/src/scrapers/catho.js`
- `worker/src/scrapers/gupy.js`
- `worker/src/scrapers/infojobs.js`
- `worker/src/scrapers/vagas.com.js`

## Classificação do item
- **Status anterior:** 🔴 (não implementado no checklist).
- **Status encontrado no código:** O sistema possui scrapers ativos para 4 plataformas e 4 placeholders documentados e mapeados no filesystem, compondo o mapa de fontes exigido na execução.
- **Novo status proposto:** 🟡 (implementado pelo responsável JULES; aguardando validação final do validador CODEX para 🟢).

## Gap identificado
- O mapa de scrapers existe.
- O gap real é que fontes como `catho`, `gupy` e `infojobs` não estão ativas na lógica de `runAllScrapers` (index.js), e os arquivos estão vazios. A arquitetura, no entanto, permite sua adição posterior, o que satisfaz o objetivo do mapa e da auditoria inicial.

## Resultado esperado x resultado real
- Resultado esperado atendido: inventário de scrapers realizado, identificando o estado real de implementação.

## Validação / evidência de execução
- Listagem dos arquivos em `worker/src/scrapers/`.
- Inspeção de código em `worker/src/scrapers/index.js`.
- Confirmação dos stubs em `catho.js`, `gupy.js`, etc.