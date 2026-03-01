# EVIDÊNCIAS — C01F01E04 · Mapa de scoring e ranking

## Objetivo
Catalogar as lógicas de scoring e ranking em `worker/src/scoring` (salary, seniority, recency, location, keywords, boosts) para verificar os fundamentos do sistema de ranqueamento.

## Evidências coletadas (paths + trechos)

### Central de Scoring — `worker/src/scoring/index.js`
A função principal exportada é `scoreJob`, que agrega a pontuação de todos os módulos. Ela limita o score entre 0 e 100, e monta também o objeto explicativo `scoreBreakdown`.

```javascript
  const kw = keywordScore(job, payload.query);
  const location = locationScore(job.location, payload.locations || []);
  const recency = recencyScore(job.postedAt);
  const boosts = extraBoosts(job, payload);
  const seniority = seniorityScore(job, payload.seniority);
  const salary = salaryScore(job, payload.expectedSalaryRange);
  const score = Math.max(0, Math.min(100, kw.points + location + recency + boosts + seniority + salary));
```

### Módulos Implementados

#### 1. Boosts (`worker/src/scoring/boosts.js`)
Dá +10 pontos se `job.remote` coincidir com `payload.remoteOnly`.
Dá +5 pontos se `payload.language` for 'en' e houver menção a "english" ou "international".

#### 2. Keywords (`worker/src/scoring/keywords.js`)
Normaliza tokens da query (utilizando `normalizeToken` do `utils/sanitize.js`) contra `title + description + tags`. Concede 10 pontos por cada match de token da query no texto da vaga.

#### 3. Location (`worker/src/scoring/location.js`)
Compara a localização da vaga com a lista de locations da query (ambos normalizados). Dá +15 pontos se houver "match".

#### 4. Recency (`worker/src/scoring/recency.js`)
Avalia os dias desde `postedAt`. Dá +20 pontos se for menor ou igual a 3 dias; +12 pontos até 7 dias; +5 pontos até 30 dias.

#### 5. Salary (`worker/src/scoring/salary.js`)
Faz parsing agressivo de faixa salarial descritiva usando expressões regulares.
Calcula matches lógicos e matemáticos entre a expectativa `expectedSalaryRange` e a string do `job.salary` e concede +10, +5 ou penalidade de -5 pontos.

#### 6. Seniority (`worker/src/scoring/seniority.js`)
Infere senioridade a partir do `job.title` e `job.description` baseando-se no dicionário `MAP` (`junior`, `pleno`, `senior`).
Concede +15 pontos por match exato com a senioridade requisitada, ou penaliza em -20 pontos caso infira uma senioridade explicitamente diferente da requisitada.

## Classificação do item
- **Status anterior:** 🔴 (não implementado no checklist).
- **Status encontrado no código:** A implementação base do motor de ranking e scoring foi confirmada e está contida modularmente em 6 arquivos independentes controlados pelo index do scoring.
- **Novo status proposto:** 🟡 (implementado pelo responsável JULES; aguardando validação final do validador CODEX para 🟢).

## Gap identificado
- Não há gaps. A implementação existe e cobre estritamente todos os pilares levantados para este item do checklist.

## Resultado esperado x resultado real
- Resultado esperado atendido: mapa e análise técnica das engrenagens de "scoring" mapeados com sucesso.

## Validação / evidência de execução
- Leitura dos arquivos em `worker/src/scoring/*.js`.
- Comprovação da centralização do index.js (`scoreJob`).