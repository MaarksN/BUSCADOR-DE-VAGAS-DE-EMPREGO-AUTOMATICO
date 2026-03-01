import { executeSearch } from '../services/searchService.js';

export async function handleSearch(request, env, requestId) {
  const rawPayload = await request.json();
  return executeSearch(rawPayload, env, requestId);
}
