# EVIDÊNCIAS — C02F01E03 · Mapa de scrapers e fontes

## Escopo auditado
- `worker/src/scrapers/index.js`
- `worker/src/scrapers/arbeitnow.js`
- `worker/src/scrapers/remotivo.js`
- `worker/src/scrapers/indeed.js`
- `worker/src/scrapers/linkedin.js`
- `worker/src/scrapers/catho.js`
- `worker/src/scrapers/gupy.js`
- `worker/src/scrapers/infojobs.js`
- `worker/src/scrapers/vagas.com.js`
- `worker/src/config.js`

## Catálogo de scrapers existentes no repositório
Arquivos encontrados em `worker/src/scrapers/`:
- `arbeitnow.js`
- `catho.js`
- `gupy.js`
- `indeed.js`
- `infojobs.js`
- `linkedin.js`
- `remotivo.js`
- `vagas.com.js`
- `index.js` (orquestração)
- `shared.js` (utilitários)

## Mapa de integração real (runtime)
### Scrapers efetivamente conectados no orquestrador (`runAllScrapers`)
No `scraperMap` de `worker/src/scrapers/index.js`, os scrapers conectados são:
- `remotivo` → `searchRemotivo`
- `arbeitnow` → `searchArbeitnow`
- `indeed` → `searchIndeed`
- `linkedin` → `searchLinkedin`

### Scrapers presentes em arquivo, porém não conectados no `scraperMap`
- `catho.js`
- `gupy.js`
- `infojobs.js`
- `vagas.com.js`

Além de não estarem conectados no orquestrador, esses quatro arquivos estão como placeholder (`searchPlaceholder` retornando array vazio).

## Coerência com fontes habilitadas na configuração
`worker/src/config.js` declara em `SITES` as chaves:
- `remotivo`, `arbeitnow`, `gupy`, `vagas`, `indeed`, `linkedin`, `infojobs`, `catho`

Gap técnico observado:
- A configuração declara 8 fontes, mas o orquestrador executa apenas 4 fontes reais (`remotivo`, `arbeitnow`, `indeed`, `linkedin`).
- `gupy`, `vagas`, `infojobs` e `catho` aparecem na configuração, porém não têm integração funcional no pipeline de scrapers.

## Classificação do status
- **Status técnico observado no código:** 🟡 (catálogo de scrapers existe, mas integração parcial e 4 fontes em placeholder).
- **Status do checklist após execução CODEX:** 🟡 (movido de 🔴 para 🟡 conforme regra de fluxo; aguardando validação do JULES para possível 🟢).

## Resultado esperado x resultado real
- **Resultado esperado:** catálogo completo de scrapers e fontes com evidência objetiva.
- **Resultado real:** catálogo documentado com identificação explícita de integração parcial e gaps de implementação para fontes placeholders.

## Tratamento de erros
- Não houve erro de path/arquivo inexistente.
- Divergências foram registradas como gap técnico entre `SITES` e `scraperMap`.
