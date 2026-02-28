# EVIDÊNCIAS — C01F01E01 · Mapa de runtime e entrypoints

## Objetivo
Inventariar os entrypoints reais do projeto e classificar o estado de implementação para o ciclo JULES C01/F01/E01.

## Evidências coletadas (paths + trechos)

### 1) Worker entrypoint — `worker/src/index.js`
- O arquivo existe e atua como router para o worker do Cloudflare.
- Exporta o default principal: `export default { async fetch(...) }`.

### 2) Frontend online entrypoint — `online-app/index.html`
- O arquivo existe e carrega a aplicação frontend: `<script type="module" src="./app.js"></script>`.

### 3) Extensão Chrome entrypoint — `chrome-extension/manifest.json`
- O arquivo existe e possui os entrypoints da extensão: `action.default_popup: "popup.html"` e `background.service_worker: "background.js"`.

### 4) Script CLI Python entrypoint — `job_finder.py`
- O script existe e atua como entrypoint Python com `if __name__ == "__main__":` chamando `main()`.

## Classificação do item
- **Status anterior:** 🔴 (não implementado no checklist).
- **Status encontrado no código:** implementação presente para todos os entrypoints solicitados.
- **Novo status proposto:** 🟡 (implementado pelo responsável JULES; aguardando validação final do validador CODEX para 🟢).

## Gap identificado
- Não há gap na implementação, a estrutura de entrypoints existe.
- Gap resolvido de documentação da evidência e governança do checklist.

## Resultado esperado x resultado real
- Resultado esperado atendido: inventário de entrypoints validado em código e relatado com sucesso em evidência formal para o C01F01E01.

## Validação / evidência de execução
- Inspeção direta dos arquivos do repositório:
  - `worker/src/index.js`
  - `online-app/index.html`
  - `chrome-extension/manifest.json`
  - `job_finder.py`
