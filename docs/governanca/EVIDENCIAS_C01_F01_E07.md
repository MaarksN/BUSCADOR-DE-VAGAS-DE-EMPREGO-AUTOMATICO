# EVIDÊNCIAS — C01F01E07 · Mapa de extensão Chrome

## Objetivo
Catalogar a arquitetura e fluxos implementados na extensão do Chrome, analisando o manifest e os scripts background, popup e options.

## Evidências coletadas (paths + trechos)

### 1. Permissões e Manifest (`chrome-extension/manifest.json`)
A extensão está configurada no formato Manifest V3 e faz uso estrito das seguintes capacidades:
- **Permissions:** `storage` (para salvar config da URL e histórico), `tabs` (para abrir vagas), `alarms` e `notifications` (para background jobs).
- **Host Permissions:** Permite acesso liberado apenas a domínios `https://*.workers.dev/*`.
- **Componentes:** Define `popup.html` (action), `options.html` e um service worker para background `background.js`.

### 2. Service Worker e Notificações (`chrome-extension/background.js`)
O script em background implanta um alarme (`verificarNovasVagas`) que executa a cada 60 minutos. Ele recupera buscas salvas (`savedSearches`), interroga silenciosamente a API do Worker (`POST /search`) e compara o campo `postedAt` para disparar notificações no sistema operacional informando novas vagas.

### 3. Interface de Ação - Popup (`chrome-extension/popup.js`)
- Efetua buscas reais chamando `POST /search`.
- Gerencia um mini-histórico local (top 5 buscas em `savedSearches`).
- Permite abrir a vaga numa nova aba (`chrome.tabs.create`).
- Diferentemente da UI Web que salva só localmente, o popup implementa a funcionalidade de favoritar chamando diretamente a API do worker via `POST /favorites`.

### 4. Configuração e Healthcheck - Options (`chrome-extension/options.js`)
- Recebe a URL base do Worker.
- Implementa um processo de "Healthcheck" obrigatório no salvamento, batendo na rota `/health` antes de persistir no `chrome.storage.local`.
- Provê mecanismos de Exportar/Importar as configurações da extensão via JSON no clipboard.

## Classificação do item
- **Status anterior:** 🔴 (não implementado no checklist).
- **Status encontrado no código:** A infraestrutura da extensão foi totalmente mapeada, possuindo Service Worker ativo para notificações, popup para buscas rápidas com persistência na API, e tela de opções com validação de contrato (`/health`).
- **Novo status proposto:** 🟡 (implementado pelo responsável JULES; aguardando validação final do validador CODEX para 🟢).

## Gap identificado
- Não existem gaps arquiteturais na extensão relativos ao escopo da auditoria.

## Resultado esperado x resultado real
- Resultado esperado atendido: mapa e validação de existência dos scripts da extensão Chrome concluídos.

## Validação / evidência de execução
- Análise de `chrome-extension/manifest.json`, `background.js`, `popup.js` e `options.js`.