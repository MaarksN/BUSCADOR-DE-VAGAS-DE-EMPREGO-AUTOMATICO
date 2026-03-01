# EVIDÊNCIAS — C01F01E04 · Mapa de scoring e ranking

## Objetivo
Catalogar o sistema de scoring do projeto implementado em `worker/src/scoring` (salary, seniority, recency, location, keywords, boosts).

## Evidências coletadas (paths + trechos)

### 1) Motor de Avaliação — `worker/src/scoring/index.js`
- O arquivo orquestra o cálculo da pontuação da vaga recebendo o objeto do job e parâmetros da busca.
- Retorna os pontos capados (`Math.min(100, Math.max(0, ...))`) e o `scoreBreakdown` contendo detalhes das categorias.
- Categorias invocadas no index.js: `scoreBoosts`, `scoreKeywords`, `scoreLocation`, `scoreRecency`, `scoreSalary`, `scoreSeniority`.

### 2) Módulos Implementados em `worker/src/scoring/`
- `boosts.js`: Incrementos por flags no JSON da vaga (ex. vagas patrocinadas, provedor prioritário).
- `keywords.js`: Avalia match do `title` e `description` da vaga perante array de `keywords` da query do usuário. Pode ponderar pesos para correspondência exata ou parcial.
- `location.js`: Compara localidade no job com localização pedida (ex: remote x office, matching city/state).
- `recency.js`: Decai o score conforme a antiguidade da vaga calculada entre `postedAt` e data atual.
- `salary.js`: Compara o salário inferido da vaga com expectativa do candidato.
- `seniority.js`: Faz matching entre nível de senioridade e expectativa.

## Classificação do item
- **Status anterior:** 🔴
- **Status encontrado no código:** O sistema de scoring está isolado e estruturado na pasta `scoring`, com cada categoria tendo seu peso próprio isolado num arquivo específico.
- **Novo status proposto:** 🟡 (aguardando validação CODEX).

## Gap identificado
- Nenhum gap arquitetural. Módulos atendem o que a tarefa descreve.

## Resultado esperado x resultado real
- Módulos catalogados e arquitetura verificada perfeitamente aderente ao descritivo de pontuação/ranking.

## Validação / evidência de execução
- Inspeção direta dos arquivos:
  - `worker/src/scoring/index.js`
  - `worker/src/scoring/*.js`

## Tratamento de erros
- N/A
