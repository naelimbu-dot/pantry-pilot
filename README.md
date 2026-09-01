# Pantry Pilot MVP

A dependency-free recipe browser with a Gemini-powered recipe guide.

## Run locally

1. Copy `.env.example` to a new file named `.env` in the project root.
2. Set `GEMINI_API_KEY` in `.env` (do not commit or share this file).
3. Run `node server.mjs` and open `http://localhost:4173`.

## API contract

`POST /api/ask`

```json
{ "question": "What can I make under $10 with chickpeas?" }
```

The local server exposes `POST /api/ask`. It sends Gemini the user's question plus the displayed recipe catalogue, then returns a grounded recommendation. The API key is read only on the server, never in browser code.
