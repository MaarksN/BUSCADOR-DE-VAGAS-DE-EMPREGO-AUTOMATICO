# EVIDÊNCIAS — C01F01E08 · Mapa de deploy e ambientes

## Objetivo
Consolidar e mapear a infraestrutura e os artefatos de deploy (Cloudflare Workers, `.env.example`, `Makefile` e `wrangler.toml`).

## Evidências coletadas (paths + trechos)

### 1. Documentação Oficial (`DEPLOY.md`)
O arquivo descreve o passo-a-passo manual para orquestrar e fazer deploy no Cloudflare Workers através do CLI `wrangler`:
1. Criação de namespace KV (Cache, Metrics, Favorites).
2. Adição de token seguro (`ADMIN_TOKEN`).
3. Deploy e validação de health.

### 2. Infraestrutura e Comandos (`Makefile`)
Um Makefile expõe utilitários de produtividade para o setup e desenvolvimento:
- `setup`: Instala as dependências de Node.
- `worker-dev`, `worker-build`, `worker-test`: Scripts locais para rodar dev servers, builds e test suite usando Vite/Miniflare.
- `web-dev`: Lança a interface de teste frontend em python HTTP server na porta `5500`.

### 3. Variavéis de Ambiente Local (`.env.example`)
Descreve a configuração local apontando o Worker para a interface web/extensão e a chave administrativa para gerenciar métricas do worker local:
```env
WORKER_URL=http://127.0.0.1:8787
ADMIN_TOKEN=changeme
```

### 4. Configuração de Runtime do Worker (`worker/wrangler.toml`)
Este arquivo mapeia explicitamente os bindings da Cloudflare que são esperados pelos módulos de negócio do worker:
- **Variáveis de Ambiente (`[vars]`)**:
  - `WORKER_VERSION`
  - `CACHE_TTL_SECONDS`
  - `RATE_LIMIT_REQUESTS`
  - `RATE_LIMIT_WINDOW_SECONDS`
- **Bindings KV (`[[kv_namespaces]]`)**:
  - O código mapeia a existência obrigatória de três buckets globais persistentes: `KV_CACHE`, `KV_METRICS` e `KV_FAVORITES`.

## Classificação do item
- **Status anterior:** 🔴 (não implementado no checklist).
- **Status encontrado no código:** O sistema possui um pipeline manual e arquitetura `wrangler` de deploy completa.
- **Novo status proposto:** 🟡 (implementado pelo responsável JULES; aguardando validação final do validador CODEX para 🟢).

## Gap identificado
- Os arquivos e a topologia estão devidamente documentados, não há gaps de implementação primária detectados no cenário atual.

## Resultado esperado x resultado real
- Resultado esperado atendido: mapeamento coeso do processo de deploy.

## Validação / evidência de execução
- Análise direta dos arquivos de deploy (`DEPLOY.md`, `.env.example`, `Makefile`, `worker/wrangler.toml`).