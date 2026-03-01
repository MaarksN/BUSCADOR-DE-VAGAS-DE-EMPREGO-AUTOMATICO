# EVIDÊNCIAS — C01F01E10 · Mapa de riscos e dívida

## Objetivo
Mapear e documentar os potenciais riscos e dívidas técnicas no repositório nas dimensões de adaptadores (scrapers), segurança (CORS e Payload), observabilidade e testes.

## Evidências coletadas (paths + trechos)

### 1. Scrapers Frágeis (`worker/src/scrapers/`)
- A plataforma usa chamadas HTTP arbitrárias não oficializadas para extrair dados (`indeed`, `linkedin`). Isso quebra frequentemente quando a plataforma-mãe muda o DOM ou adiciona Cloudflare Turnstile/CAPTCHA.
- Metade das fontes documentadas não estão implementadas (C01F01E03: `catho`, `gupy`, `infojobs` e `vagas.com` são stubs que retornam Arrays vazios).
- O fallback e controle de erro é apenas via timeout de promise (`timeoutPromise`) e Circuit Breaker. Quando estoura 5000ms a requisição falha silenciosamente pela perspectiva do provedor.

### 2. Payload Validation e Segurança (`worker/src/handlers/validate.js`)
- Não há um validador de schema estrito e rigoroso como JSON Schema (AJV / Zod).
- A validação de payloads (`validateSearchPayload`) parece imperativa e baseada em checks soltos. Risco alto de Type Mismatches quebrar o scoring, gerando crashes silenciosos como `NaN`.

### 3. Middleware CORS (`worker/src/middleware/cors.js`)
- A configuração atual permite Wildcard (`*`) como padrão caso a env `CORS_ALLOWED_ORIGINS` não seja definida. Em produção isso cria um risco de Abuso de Backend onde qualquer UI aleatória ou script cross-domain consegue onerar a infraestrutura de scrapers do Worker esgotando as cotas da API.

### 4. Cobertura de Testes Limitada
- Como verificado em C01F01E09, existem apenas testes unitários em lógica de scoring e filtering. Não há testes E2E, e tampouco de integração que validem as mutações do Worker via HTTP.

### 5. Arquitetura Acoplada (Handlers)
- A lógica de negócio muitas vezes reside diretamente nos adaptadores ou é misturada com controle de rede e rotas no handler `search.js` e `favorites.js`. Não há uma abstração clara de Serviços intermediando as solicitações.

## Classificação do item
- **Status anterior:** 🔴 (não implementado no checklist).
- **Status encontrado no código:** O mapa e inventário de dívidas técnicas foram extraídos analisando a topologia real do código e listam itens passíveis de refatoração para os próximos ciclos (C02+).
- **Novo status proposto:** 🟡 (implementado pelo responsável JULES; aguardando validação final do validador CODEX para 🟢).

## Gap identificado
- Este item é o mapeamento final do C01F01, portanto não é um gap nele mesmo, mas a fundação sobre a qual as execuções de estabilidade trabalharão nos ciclos subsequentes.

## Resultado esperado x resultado real
- Resultado esperado atendido: mapa de riscos levantado detalhadamente.

## Validação / evidência de execução
- Análise holística baseada nas execuções de C01F01E02 a C01F01E09, complementada com leitura fina sobre middlewares CORS e testes.