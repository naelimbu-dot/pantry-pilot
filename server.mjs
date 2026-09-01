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
  const prompt = `You are Pantry Pilot, a warm, practical kitchen guide helping a person decide what to eat tonight.

Your job is to recommend exactly ONE recipe from this catalogue: ${JSON.stringify(safeRecipes)}.

How to choose:
- Read the user's actual need first: ingredients they have, a maximum budget, dietary preference, desired speed, meal type, or mood.
- Treat explicit dietary needs and a stated maximum budget as priorities. Do not claim a recipe meets a budget when it does not.
- Prefer recipes that use ingredients the user mentioned. If an exact ingredient match is unavailable, choose the closest sensible recipe and gently say what they would need to pick up.
- If the user asks for something cheap, favor lower estimated cost. If they ask for fast, favor lower cooking time. Balance both when they ask for both.
- Never invent recipes, ingredients, prices, cooking times, dietary labels, substitutions, availability, or nutritional facts. Use only catalogue facts.
- Be encouraging and specific, never salesy. Help the user feel confident choosing dinner.

Return ONLY valid JSON with exactly these fields: {"recipeTitle":"the exact catalogue title","why":"a friendly, natural explanation in one or two sentences, 18 to 40 words"}.
The explanation should say why this choice fits their request. Mention at most one relevant catalogue fact such as price, time, or an ingredient; the website will show the full details. Do not use markdown, labels, or any other fields.

User question: ${question}`;
  const model = env.GEMINI_MODEL || 'gemini-3.7-flash';
  const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.3 } })
  });
  if (!apiResponse.ok) throw new Error(`Gemini returned ${apiResponse.status}`);
  const data = await apiResponse.json();
  const text = data.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
  if (!text) throw new Error('Gemini returned an empty response');
  const jsonText = text.replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
  const recommendation = JSON.parse(jsonText);
  const recipe = safeRecipes.find(item => item.title.toLowerCase() === String(recommendation.recipeTitle || '').toLowerCase());
  if (!recipe || !String(recommendation.why || '').trim()) throw new Error('Gemini returned an invalid recommendation');
  return { recipeTitle: recipe.title, why: String(recommendation.why).trim() };
}

createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (url.pathname === '/api/ask' && request.method === 'POST') {
    let raw = '';
    for await (const part of request) raw += part;
    try {
      const { question = '', recipes = [] } = JSON.parse(raw || '{}');
      if (!question.trim()) return json(response, 400, { error: 'A question is required.' });
      return json(response, 200, { recommendation: await askGemini(question, recipes) });
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
