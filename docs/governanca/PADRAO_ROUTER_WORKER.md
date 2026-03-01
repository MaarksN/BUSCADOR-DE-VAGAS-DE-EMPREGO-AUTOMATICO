# Padrão de Router Declarativo — Worker

## Estrutura atual
O roteador em `worker/src/index.js` utiliza uma tabela declarativa por método HTTP (`GET`, `POST`, `DELETE`), com entradas compostas por:
- `path` (string ou regex)
- `handler` (função executora)

## Convenções para novos endpoints
1. Registrar a rota dentro do bloco do método correspondente.
2. Preferir handlers em `worker/src/handlers/*` com responsabilidade única.
3. Envelopar respostas JSON com `routeJson` para padronização de erro e CORS.
4. Para rotas sensíveis, aplicar middleware explícito no próprio item da tabela (ex.: `requireAdminAuth`, `requireJson`, `checkRateLimit`).
5. Manter nomenclatura consistente (`handle<Recurso>`).

## Exemplo recomendado
```js
POST: [
  {
    path: '/novo-endpoint',
    handler: (req, env, rid) => routeJson(req, env, rid, handleNovoEndpoint)
  }
]
```

## Resultado esperado
- Menor acoplamento no `fetch` principal.
- Inclusão segura de rotas sem regressão em CORS/erros.
- Facilidade de revisão e governança técnica.
