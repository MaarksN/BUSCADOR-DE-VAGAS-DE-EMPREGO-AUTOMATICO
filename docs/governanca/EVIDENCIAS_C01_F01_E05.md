# EVIDÊNCIAS — C01F01E05 · Mapa de cache e rate limit

## Objetivo
Catalogar as configurações de Rate Limit e Cache utilizadas no roteamento e armazenamento de métricas do worker para atestar a segurança e resiliência básicas da arquitetura.

## Evidências coletadas (paths + trechos)

### 1. Middleware de Rate Limit (`worker/src/middleware/rateLimit.js`)
O middleware `checkRateLimit` gerencia o número de requisições por IP, Tenant e API Key dentro de uma janela de tempo (padrão 60 segundos com 10 limites).
Ele implementa uma estratégia robusta e híbrida com "graceful degradation": tenta gravar/ler primariamente do `KV_CACHE`, e em caso de falha (ou ausência do KV configurado) faz fallback para um mapa em memória (`memoryRate`).

```javascript
    if (!env.KV_CACHE) {
      const count = checkMemoryRate(key, now, windowMs);
      return { limited: count > limit, current: count, limit, retryAfter: windowSeconds - Math.floor((now / 1000) % windowSeconds) };
    }
```

### 2. Implementação do Cache e KV Storage para Métricas (`worker/src/metrics/index.js` e `worker/src/handlers/metrics.js`)
O arquivo `worker/src/metrics/index.js` gerencia o acesso ao bucket `KV_METRICS` (cache durável no Cloudflare) através das funções `getMetrics`, `incrementMetric`, e `resetMetrics`. O método `incrementMetric` usa retry-logic linear/incremental para lidar com falhas transitórias do KV.
Os endpoints correspondentes são consumidos pelo handler `worker/src/handlers/metrics.js`.

### 3. Integração de Proteção (`worker/src/index.js`)
O Rate Limit é acionado ativamente no endpoint sensível e custoso de POST `/search` antes do roteamento da resposta. Ele devolve HTTP 429 explícito na falha, com cabeçalho de tempo de bloqueio, e incrementa ativamente o cache de métricas caso o rate limit seja atingido:

```javascript
            const rate = await checkRateLimit(req, runtimeEnv);
            if (rate.limited) {
              await incrementMetric(runtimeEnv, 'rateLimited', 1);
              return withCors(withJson({ error: 'Rate limit excedido' }, 429, rid, { 'Retry-After': String(rate.retryAfter) }), req, runtimeEnv);
            }
```

## Classificação do item
- **Status anterior:** 🔴 (não implementado no checklist).
- **Status encontrado no código:** A implementação de rate limit inteligente usando KV (com fallback memory) e cache de métricas em KV estão totalmente presentes e conectadas no worker principal.
- **Novo status proposto:** 🟡 (implementado pelo responsável JULES; aguardando validação final do validador CODEX para 🟢).

## Gap identificado
- Não existem gaps arquiteturais em relação ao item de auditoria. Rate Limit e o Cache atrelado a ele e às métricas estão operacionais no ambiente base.

## Resultado esperado x resultado real
- Resultado esperado atendido: inventário sobre as fronteiras de Rate Limit e persistência de cache mapeado.

## Validação / evidência de execução
- Leitura dos arquivos em `worker/src/middleware/rateLimit.js` e os relacionados a métricas `worker/src/metrics/index.js` e handler associado.
- Inspeção da amarração técnica no ponto de entrada `index.js`.