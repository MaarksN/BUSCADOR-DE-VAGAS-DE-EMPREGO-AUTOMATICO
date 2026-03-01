# EVIDÊNCIAS — C01F01E06 · Mapa de UI web

## Objetivo
Catalogar a arquitetura e fluxos implementados na UI Web (`online-app/app.js` e `online-app/config.js`), avaliando especificamente o ciclo de buscas, listagens e favoritos no lado do cliente.

## Evidências coletadas (paths + trechos)

### Configuração e Constantes (`online-app/config.js`)
O arquivo centraliza o controle das chaves de local storage usadas para persistência de estado do cliente (settings, cache de payload, controle de favoritos offline e logs de status health).

### Lógica da Aplicação (`online-app/app.js`)
O script manipula ativamente a DOM e implementa todo o fluxo funcional do frontend:

1. **Gestão do Roteamento de API e Requests:**
   - A função `requestSearchWithRetry` executa as chamadas via `POST /search` da API do worker e adiciona lógica de retentativas linear em caso de Rate Limit (HTTP 429) ou erros transientes (HTTP >= 500), controlada pela constante `SEARCH_RETRY_LIMIT`.
   - Há controle de cancelamento preemptivo e timeout via `AbortController`.

2. **Fluxo de Favoritos (Local):**
   - O armazenamento de favoritos é executado puramente no `localStorage` sob a chave definida por `FAVORITES_KEY`.
   - Há listeners de UI atrelados ao `bookmarkBtn` que interceptam os 3 primeiros resultados (Top 3) e efetuam merge com favoritos existentes garantindo unicidade de URL.

3. **Status e Observabilidade na UI:**
   - Funções como `renderDiagnostics`, `renderWarnings`, `checkHealth` expõem os dados processados do worker diretamente para o usuário.
   - Existe persistência de histórico (`persistLastSummary`) e exportação/importação de JSON (`exportSettings`).

## Classificação do item
- **Status anterior:** 🔴 (não implementado no checklist).
- **Status encontrado no código:** A implementação base de um cliente desacoplado (UI Vanilla JS) se comunica robustamente com os endpoints do Cloudflare Worker, suportando retries e caches de favoritos offline.
- **Novo status proposto:** 🟡 (implementado pelo responsável JULES; aguardando validação final do validador CODEX para 🟢).

## Gap identificado
- Os "favoritos" do Web UI são apenas locais e não se integram com os endpoints de Favorites da API do Worker (ex: `POST /favorites`), mas funcionam dentro do escopo do que foi mapeado para a UI em si.

## Resultado esperado x resultado real
- Resultado esperado atendido: catálogo das funções do frontend web (fluxo de busca/favoritos).

## Validação / evidência de execução
- Leitura estruturada dos arquivos `online-app/app.js` e `online-app/config.js`.