const UPSTREAM = 'http://sylvan.apple.com';
const PATH = /^\/(Aerials\/2x\/)?Videos\/[\w.-]+\.(mov|mp4)$/;
const ALLOWED_ORIGINS = ['https://jeancarlos.github.io', 'http://localhost:8000', 'http://127.0.0.1:8000'];
const PASSED = ['content-type', 'content-length', 'content-range', 'accept-ranges', 'etag', 'last-modified'];

export function originOf(request) {
  const origin = request.headers.get('origin');
  if (origin) return origin;
  const referer = request.headers.get('referer');
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch (e) {
    return null;
  }
}

export function makeHandler(upstreamFetch) {
  return async function handle(request) {
    const origin = originOf(request);
    if (!origin || ALLOWED_ORIGINS.indexOf(origin) < 0) return new Response('forbidden', { status: 403 });

    const cors = {
      'access-control-allow-origin': origin,
      'access-control-allow-headers': 'range',
      'access-control-expose-headers': 'content-length, content-range, accept-ranges',
      vary: 'Origin'
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('method not allowed', { status: 405, headers: cors });

    const path = new URL(request.url).pathname;
    if (!PATH.test(path)) return new Response('not found', { status: 404, headers: cors });

    const headers = {};
    const range = request.headers.get('range');
    if (range) headers.range = range;
    const upstream = await upstreamFetch(UPSTREAM + path, { method: request.method, headers });

    const out = new Headers(cors);
    PASSED.forEach(name => {
      const value = upstream.headers.get(name);
      if (value) out.set(name, value);
    });
    return new Response(upstream.body, { status: upstream.status, headers: out });
  };
}

export default { fetch: makeHandler(fetch) };
