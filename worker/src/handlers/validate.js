import { validateSearchPayload } from './search.js';
import { withJson } from './shared.js';
import { getRuntimeConfig } from '../config.js';

export async function handleValidate(request, env, requestId) {
  const body = await request.json();
  const errors = validateSearchPayload(body);
  const cfg = getRuntimeConfig(env);

  if (body.schemaVersion && body.schemaVersion !== cfg.version) {
    errors.push(`schemaVersion mismatch: esperado ${cfg.version}, recebido ${body.schemaVersion}`);
  }

  return withJson({
    ok: errors.length === 0,
    schemaVersion: cfg.version,
    errors
  }, errors.length ? 400 : 200, requestId);
}
