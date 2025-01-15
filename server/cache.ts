import { defineEventHandler } from 'h3';
const mcache = require("memory-cache");

export default defineEventHandler(async (event) => {
  const key = event.node.req.url;
  const cachedResponse = mcache.get(key);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await send(event); // Oryginalna odpowiedź
  mcache.put(key, response, 10000); // Cache na 10 sekund
  return response;
});