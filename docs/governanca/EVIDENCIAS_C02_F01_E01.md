# EVIDÊNCIAS — C02F01E01 · Mapa de runtime e entrypoints

## Objetivo
Inventariar os entrypoints reais do projeto e classificar o estado de implementação para o ciclo CODEX C02/F01/E01.

## Evidências coletadas (paths + trechos)

### 1) Worker entrypoint — `worker/src/index.js`
- O arquivo existe e exporta o runtime principal (`export default { async fetch(...) }`) que roteia endpoints HTTP do Worker.
- Evidência: imports de handlers e função `fetch` com rotas GET/POST/DELETE.

### 2) Frontend online entrypoint — `online-app/index.html`
- O arquivo existe e declara carregamento do módulo principal do front com `<script type="module" src="./app.js"></script>`.
- Evidência: estrutura da interface e bootstrap do app no final do HTML.

### 3) Extensão Chrome entrypoint — `chrome-extension/manifest.json`
- O arquivo existe e define entrypoints de extensão MV3:
  - `action.default_popup: "popup.html"`
  - `background.service_worker: "background.js"`
  - `options_page: "options.html"`

### 4) Script CLI Python entrypoint — `job_finder.py`
- O arquivo existe e possui ponto de entrada tradicional de execução (`main`) com parsing de argumentos e fluxo de busca.

## Classificação do item
- **Status anterior:** 🔴 (não implementado no checklist).
- **Status encontrado no código:** implementação presente para todos os entrypoints solicitados.
- **Novo status proposto:** 🟡 (implementado pelo responsável CODEX; aguardando validação final do validador JULES para 🟢).

## Gap identificado
- Não há gap de implementação dos entrypoints pedidos no item.
- O gap era de **governança/evidência formal** no checklist (este documento + atualização de status e log).

## Resultado esperado x resultado real
- Resultado esperado atendido: inventário realizado com base em arquivos reais do repositório e status atualizado para execução do responsável.

## Validação / evidência de execução
- Inspeção direta dos arquivos:
  - `worker/src/index.js`
  - `online-app/index.html`
  - `chrome-extension/manifest.json`
  - `job_finder.py`

## Tratamento de erros
- Não houve erro de path inexistente nos arquivos exigidos pelo item.
