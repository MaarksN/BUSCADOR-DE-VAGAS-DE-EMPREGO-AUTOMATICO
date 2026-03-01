# EVIDÊNCIAS — C02F02E01 · Contrato de payload (schemaVersion)

## Escopo auditado/alterado
- `worker/src/services/searchService.js`
- `worker/src/handlers/validate.js`
- `worker/src/handlers/search.js`

## O que foi implementado
- Validação explícita de `schemaVersion` no contrato de busca:
  - formato semver obrigatório quando informado (`x.y.z`)
  - compatibilidade com versão de runtime (`getRuntimeConfig(env).version`)
- Endpoint `/validate` agora retorna `schemaVersion` no envelope de resposta.
- Fluxo de `/search` centralizado no serviço, preservando resposta com `schemaVersion` no payload final.

## Evidência prática
- `validateSearchPayload(body, runtimeVersion)` passou a validar `schemaVersion`.
- `handleValidate` agora injeta versão de runtime na validação e resposta.

## Status técnico observado
- Contrato request/response com `schemaVersion` ficou explícito e validável.
- **Status técnico:** 🟢 para o escopo desta execução.

## Status de execução no checklist
- **Checklist CODEX:** 🔴 → 🟡 (aguardando validação JULES).
