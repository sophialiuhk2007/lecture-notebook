// Lecture Notebook — relay for Harvard's HUIT OpenAI gateway (a Cloudflare Worker).
//
// Harvard's gateway (go.apis.huit.harvard.edu) works from code, but it doesn't send the CORS headers that browsers
// require, so a web page like the notebook can't call it directly. This Worker forwards the notebook's requests to the
// gateway unchanged and adds those headers. It keeps nothing: each visitor's own HUIT key travels in the request's
// "api-key" header, straight through to Harvard.
//
// Deploy (free Cloudflare account): Workers & Pages → Create → Worker → paste this file → Deploy.
// Then in the notebook: ⚙ Settings → AI → Harvard OpenAI → Gateway address:
//   https://<your-worker>.workers.dev/comdev     (OpenAI for Community Developers)
//   https://<your-worker>.workers.dev/direct     (pay-as-you-go OpenAI Direct)

// Sites allowed to use this relay (add your own copy's address if you host one).
const ALLOWED_ORIGINS = [
  'https://sophialiuhk2007.github.io',
  'http://localhost:8000',
];

// Harvard's OpenAI products (v1 was retired on 10/1/26).
const TARGETS = {
  comdev: 'https://go.apis.huit.harvard.edu/ais-openai-direct-comdev/v2',
  direct: 'https://go.apis.huit.harvard.edu/ais-openai-direct/v2',
};

// Only what the notebook uses.
const PATHS = /^\/(chat\/completions|models|apigee\/quota)$/;

export default {
  async fetch(request) {
    const origin = request.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'api-key, content-type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (!allowed) return new Response('This relay only serves the Lecture Notebook site.', { status: 403, headers: cors });

    const url = new URL(request.url);
    const [, product, ...rest] = url.pathname.split('/');
    const base = TARGETS[product];
    const path = '/' + rest.join('/');
    if (!base || !PATHS.test(path) || !['GET', 'POST'].includes(request.method)) {
      return new Response('Not found', { status: 404, headers: cors });
    }

    const headers = new Headers({ 'api-key': request.headers.get('api-key') || '' });
    if (request.method === 'POST') headers.set('content-type', request.headers.get('content-type') || 'application/json');
    const upstream = await fetch(base + path + url.search, {
      method: request.method,
      headers,
      body: request.method === 'POST' ? await request.arrayBuffer() : undefined,
    });

    // stream the answer back as it arrives (the notebook shows replies while they're written)
    const out = new Headers(upstream.headers);
    for (const [k, v] of Object.entries(cors)) out.set(k, v);
    out.delete('content-encoding'); out.delete('content-length');
    return new Response(upstream.body, { status: upstream.status, headers: out });
  },
};
