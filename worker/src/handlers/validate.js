import { getRuntimeConfig } from '../config.js';
import { validateSearchPayload } from '../services/searchService.js';
import { withJson } from './shared.js';

export async function handleValidate(request, env, requestId) {
  const body = await request.json();
  const cfg = getRuntimeConfig(env);
  const errors = validateSearchPayload(body, cfg.version);
  return withJson({ ok: errors.length === 0, errors, schemaVersion: cfg.version }, errors.length ? 400 : 200, requestId);
}
