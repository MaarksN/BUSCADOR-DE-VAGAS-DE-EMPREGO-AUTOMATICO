import { getRuntimeConfig } from '../config.js';
import { getCachedSearch, setCachedSearch } from '../cache/index.js';
import { incrementMetric } from '../metrics/index.js';
import { normalizeToken } from '../utils/sanitize.js';
import { withJson } from './shared.js';
import {
  validateSearchPayload,
  normalizePayload,
  processSearch
} from '../services/searchService.js';

function cacheKeyFromPayload(payload, cfg) {
  return normalizeToken(JSON.stringify({ ...payload, page: 1, schemaVersion: cfg.version }));
}

export async function handleSearch(request, env, requestId) {
  const rawPayload = await request.json();
  const errors = validateSearchPayload(rawPayload);
  if (errors.length) {
    await incrementMetric(env, 'invalidPayloads', 1);
    return withJson({ error: 'Payload inválido', errors }, 400, requestId);
  }

  const payload = normalizePayload(rawPayload);
  await incrementMetric(env, 'searchRequests', 1);
  const cfg = getRuntimeConfig(env);
  const cacheKey = cacheKeyFromPayload(payload, cfg);
  const cached = await getCachedSearch(env, cacheKey);

  if (cached) {
    await incrementMetric(env, 'cacheHits', 1);
    return withJson({ ...cached, cached: true }, 200, requestId, { 'x-cache': 'HIT' });
  }

  await incrementMetric(env, 'cacheMisses', 1);

  const response = await processSearch(payload, env, rawPayload, cfg);

  await setCachedSearch(env, cacheKey, response, cfg.cacheTtlSeconds);
  await incrementMetric(env, 'totalResultsReturned', response.results.length);
  if (response.warnings.length) await incrementMetric(env, 'upstreamErrors', response.warnings.length);
  return withJson(response, 200, requestId, { 'x-cache': 'MISS' });
}

export { validateSearchPayload };