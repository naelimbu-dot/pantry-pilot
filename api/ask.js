/**
 * API-ready recipe guidance endpoint.
 * Deploy this handler in your preferred serverless runtime and point the UI at /api/ask.
 * POST { "question": "what can I make under $10 with chickpeas?" }
 * Returns { "answer": string, "recipe": Recipe }
 */
export async function onRequestPost({ request, env }) {
  const { question = '' } = await request.json();
  const recipes = env.RECIPES ? JSON.parse(env.RECIPES) : [];
  const budget = Number((question.match(/\$?\s?(\d+(?:\.\d+)?)/) || [])[1]);
  const words = question.toLowerCase().split(/\W+/);
  const pick = recipes.find(recipe => (!budget || recipe.price <= budget) && recipe.ingredients.some(item => words.some(word => item.toLowerCase().includes(word))))
    || recipes.filter(recipe => !budget || recipe.price <= budget).sort((a, b) => a.price - b.price)[0];
  if (!pick) return Response.json({ answer: 'No matching recipe found yet.', recipe: null }, { status: 404 });
  return Response.json({ answer: `${pick.title} costs about $${pick.price.toFixed(2)} for two servings.`, recipe: pick });
}
