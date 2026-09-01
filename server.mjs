import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const envPath = join(root, '.env');
const env = { ...process.env };

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !match[1].startsWith('#')) env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };

function json(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

async function askGemini(question, recipes) {
  if (!env.GEMINI_API_KEY) throw new Error('Missing GEMINI_API_KEY');
  const safeRecipes = Array.isArray(recipes) ? recipes.slice(0, 50).map(({ title, price, ingredients }) => ({ title, price, ingredients })) : [];
  const prompt = `You are Pantry Pilot's helpful recipe guide. Only recommend recipes from this catalogue: ${JSON.stringify(safeRecipes)}. Answer the user's question concisely. Include an estimated price and a few key ingredients. If nothing fits, say so and suggest the closest option. User question: ${question}`;
  const model = env.GEMINI_MODEL || 'gemini-3.7-flash';
  const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.3 } })
  });
  if (!apiResponse.ok) throw new Error(`Gemini returned ${apiResponse.status}`);
  const data = await apiResponse.json();
  return data.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim() || 'I could not find a recipe response.';
}

createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (url.pathname === '/api/ask' && request.method === 'POST') {
    let raw = '';
    for await (const part of request) raw += part;
    try {
      const { question = '', recipes = [] } = JSON.parse(raw || '{}');
      if (!question.trim()) return json(response, 400, { error: 'A question is required.' });
      return json(response, 200, { answer: await askGemini(question, recipes) });
    } catch (error) {
      return json(response, env.GEMINI_API_KEY ? 502 : 503, { error: error.message });
    }
  }
  const requestPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = normalize(join(root, requestPath));
  if (!filePath.startsWith(root) || filePath.endsWith('.env') || !existsSync(filePath)) { response.writeHead(404); return response.end('Not found'); }
  response.writeHead(200, { 'Content-Type': mime[extname(filePath)] || 'application/octet-stream' });
  createReadStream(filePath).pipe(response);
}).listen(Number(env.PORT || 4173), '0.0.0.0', () => console.log(`Pantry Pilot is running at http://localhost:${env.PORT || 4173}`));
