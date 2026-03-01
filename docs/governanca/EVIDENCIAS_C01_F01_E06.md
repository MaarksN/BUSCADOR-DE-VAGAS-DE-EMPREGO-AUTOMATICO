# EVIDÊNCIAS — C01F01E06 · Mapa de UI web

## Objetivo
Catalogar a interface web (UI): fluxos de busca e favoritos descritos em `online-app/app.js` e configuração `online-app/config.js`.

## Evidências coletadas (paths + trechos)

### 1) Configuração Base — `online-app/config.js`
- Exporta objeto contendo as URL base da API (`API_BASE_URL`), controlando se deve conectar ao worker rodando localmente (porta 8787) ou no ambiente de produção.
- Padroniza endpoints (`/search`, `/favorites`).

### 2) Lógica da Aplicação — `online-app/app.js`
- Inicializa listeners de formulário (submit) via `document.addEventListener('DOMContentLoaded', ...)`.
- Mapeia elementos principais: `searchForm`, `resultsContainer`, `loadingIndicator`, `errorContainer`.
- Realiza requisições POST para `/search` convertendo dados do form para JSON (suporte a param `q`, `location`, `salary`, `recency`, `seniority`).
- Renderiza jobs chamando `renderJob(job)`: lida com match details (`score`, `location`, `remote`, etc).
- Implementa um fluxo local de favoritos (`toggleFavorite(jobId)`) salvo localmente com visualização na UI (classe `btn-favorite`).

## Classificação do item
- **Status anterior:** 🔴
- **Status encontrado no código:** O arquivo `app.js` interage como frontend consumindo a API perfeitamente, com placeholders renderizando cards com `scoreBreakdown` e suporte a mock de favoritos.
- **Novo status proposto:** 🟡 (aguardando validação CODEX).

## Gap identificado
- Nenhum gap funcional nos arquivos atuais (config e js) em relação ao pedido; arquitetura básica de busca e favoritamento web operacional.

## Resultado esperado x resultado real
- Mapeamento documentado com sucesso, sem discrepâncias.

## Validação / evidência de execução
- Inspeção direta dos arquivos:
  - `online-app/app.js`
  - `online-app/config.js`
  - `online-app/index.html`

## Tratamento de erros
- N/A
