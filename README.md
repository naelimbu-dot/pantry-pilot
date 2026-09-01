# Pantry Pilot

Pantry Pilot is a recipe discovery website for finding practical meals by ingredient, budget, or cooking time. It includes 25 recipes with estimated two-serving costs, full ingredient lists, dish-specific photography, and a persistent assistant that recommends what to cook.

## API-powered recipe guide

The site exposes `POST /api/ask`. The browser sends a question plus the visible recipe catalogue; the server calls Google Gemini and returns a concise, catalogue-grounded recommendation. The Gemini key stays server-side in `.env` and is never sent to the browser.

Example request:

```json
{
  "question": "What can I make under $10 with chickpeas?"
}
```

## API contract

`POST /api/ask`

```json
{ "question": "What can I make under $10 with chickpeas?" }
```

The local server exposes `POST /api/ask`. It sends Gemini the user's question plus the displayed recipe catalogue, then returns a grounded recommendation. The API key is read only on the server, never in browser code.
