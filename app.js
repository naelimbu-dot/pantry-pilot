const recipes = [
  { id: 'crispy-chickpea-pitas', title: 'Crispy chickpea pitas', tag: 'VEGETARIAN', time: '25 MIN', price: 8.5, ingredients: ['1 can chickpeas', '4 pita breads', '1 cucumber', 'Greek yogurt', 'Lemon + spices'], description: 'Spiced chickpeas, cool yogurt and crunchy cucumber.' },
  { id: 'tomato-basil-pasta', title: 'Tomato basil pasta', tag: 'PANTRY', time: '20 MIN', price: 6.75, ingredients: ['Pasta', '1 can tomatoes', 'Fresh basil', 'Parmesan', 'Garlic'], description: 'A fast, bright red-sauce dinner with five staples.' },
  { id: 'ginger-tofu-rice-bowls', title: 'Ginger tofu rice bowls', tag: 'VEGETARIAN', time: '30 MIN', price: 9.25, ingredients: ['Firm tofu', 'Rice', 'Broccoli', 'Soy sauce', 'Fresh ginger'], description: 'Crisp tofu and greens in a savory ginger glaze.' },
  { id: 'sheet-pan-sausage', title: 'Sheet-pan sausage & veg', tag: 'ONE PAN', time: '35 MIN', price: 11.5, ingredients: ['Chicken sausage', 'Potatoes', 'Bell peppers', 'Red onion', 'Olive oil'], description: 'Minimal cleanup, maximum caramelized edges.' },
  { id: 'black-bean-tacos', title: 'Smoky black bean tacos', tag: 'VEGETARIAN', time: '20 MIN', price: 7.8, ingredients: ['2 cans black beans', 'Tortillas', 'Avocado', 'Lime', 'Taco seasoning'], description: 'The low-effort taco night your budget asked for.' },
  { id: 'lemon-herb-chicken', title: 'Lemon herb chicken', tag: 'FAMILY FAVORITE', time: '40 MIN', price: 13.25, ingredients: ['Chicken thighs', 'Lemon', 'Green beans', 'Couscous', 'Dried herbs'], description: 'Golden chicken with a fresh, lemony finish.' }
  ,{ id: 'mushroom-risotto', title: 'Creamy mushroom risotto', tag: 'VEGETARIAN', time: '45 MIN', price: 10.5, ingredients: ['Arborio rice', 'Mushrooms', 'Vegetable stock', 'Parmesan', 'Garlic'], description: 'A slow, cozy bowl worth stirring for.' }
  ,{ id: 'coconut-lentil-curry', title: 'Coconut lentil curry', tag: 'VEGETARIAN', time: '35 MIN', price: 7.25, ingredients: ['Red lentils', 'Coconut milk', 'Spinach', 'Curry paste', 'Rice'], description: 'A rich pantry curry that freezes beautifully.' }
  ,{ id: 'turkey-meatball-subs', title: 'Turkey meatball subs', tag: 'CROWD PLEASER', time: '35 MIN', price: 12.75, ingredients: ['Ground turkey', 'Sub rolls', 'Marinara', 'Mozzarella', 'Italian herbs'], description: 'Saucy, cheesy, weeknight-friendly sandwiches.' }
  ,{ id: 'sesame-noodles', title: 'Cold sesame noodles', tag: 'PANTRY', time: '15 MIN', price: 6.5, ingredients: ['Noodles', 'Peanut butter', 'Sesame oil', 'Cucumber', 'Scallions'], description: 'Nutty, crisp, and perfect for a no-fuss lunch.' }
  ,{ id: 'sweet-potato-chili', title: 'Sweet potato chili', tag: 'VEGETARIAN', time: '40 MIN', price: 8.75, ingredients: ['Sweet potatoes', 'Kidney beans', 'Diced tomatoes', 'Corn', 'Chili powder'], description: 'Hearty, smoky comfort with a little sweetness.' }
  ,{ id: 'salmon-couscous', title: 'Lemony salmon couscous', tag: 'BRIGHT & LIGHT', time: '25 MIN', price: 14.5, ingredients: ['Salmon fillets', 'Couscous', 'Lemon', 'Arugula', 'Dill'], description: 'Fast-cooking salmon with a fresh green side.' }
  ,{ id: 'fried-rice', title: 'Fridge-cleanout fried rice', tag: 'FLEXIBLE', time: '20 MIN', price: 5.75, ingredients: ['Cooked rice', 'Eggs', 'Frozen peas', 'Soy sauce', 'Carrots'], description: 'The best use for leftover rice and stray vegetables.' }
  ,{ id: 'pesto-white-beans', title: 'Pesto white bean toast', tag: 'VEGETARIAN', time: '15 MIN', price: 7.1, ingredients: ['White beans', 'Sourdough', 'Pesto', 'Cherry tomatoes', 'Arugula'], description: 'A generous, green, speedy supper on toast.' }
  ,{ id: 'beef-broccoli', title: 'Beef & broccoli stir-fry', tag: 'TAKEOUT AT HOME', time: '30 MIN', price: 13.8, ingredients: ['Flank steak', 'Broccoli', 'Rice', 'Soy sauce', 'Brown sugar'], description: 'Savory glazed beef with tender-crisp broccoli.' }
  ,{ id: 'tortellini-soup', title: 'Tuscan tortellini soup', tag: 'COZY', time: '30 MIN', price: 11.25, ingredients: ['Cheese tortellini', 'Sausage', 'Kale', 'Chicken stock', 'Cream'], description: 'A deeply comforting one-pot dinner.' }
  ,{ id: 'shakshuka', title: 'Tomato shakshuka', tag: 'VEGETARIAN', time: '25 MIN', price: 7.5, ingredients: ['Eggs', 'Crushed tomatoes', 'Bell pepper', 'Feta', 'Crusty bread'], description: 'Jammy eggs tucked into spiced tomato sauce.' }
  ,{ id: 'fish-tacos', title: 'Crispy fish tacos', tag: 'WEEKEND', time: '30 MIN', price: 14.0, ingredients: ['White fish', 'Tortillas', 'Cabbage', 'Lime', 'Sour cream'], description: 'Crunchy slaw, bright lime, and flaky fish.' }
  ,{ id: 'spinach-gnocchi', title: 'Spinach gnocchi skillet', tag: 'VEGETARIAN', time: '20 MIN', price: 9.5, ingredients: ['Gnocchi', 'Spinach', 'Sun-dried tomatoes', 'Cream', 'Parmesan'], description: 'Pillowy gnocchi in a creamy, savory skillet sauce.' }
  ,{ id: 'chicken-noodle-soup', title: 'Shortcut chicken noodle soup', tag: 'COZY', time: '30 MIN', price: 10.75, ingredients: ['Rotisserie chicken', 'Egg noodles', 'Carrots', 'Celery', 'Chicken stock'], description: 'Comfort food with a useful head start.' }
  ,{ id: 'halloumi-salad', title: 'Warm halloumi grain salad', tag: 'VEGETARIAN', time: '25 MIN', price: 11.0, ingredients: ['Halloumi', 'Farro', 'Zucchini', 'Lemon', 'Mint'], description: 'Salty, golden halloumi over chewy grains.' }
  ,{ id: 'ramen-bowls', title: 'Miso ramen bowls', tag: 'FLEXIBLE', time: '25 MIN', price: 9.75, ingredients: ['Ramen noodles', 'Miso paste', 'Eggs', 'Mushrooms', 'Bok choy'], description: 'A slurpable bowl with plenty of greens.' }
  ,{ id: 'baked-ziti', title: 'Weeknight baked ziti', tag: 'FAMILY FAVORITE', time: '45 MIN', price: 12.25, ingredients: ['Ziti', 'Marinara', 'Ricotta', 'Mozzarella', 'Spinach'], description: 'A crowd-size classic with a bubbling cheese top.' }
  ,{ id: 'quinoa-burrito-bowls', title: 'Quinoa burrito bowls', tag: 'VEGETARIAN', time: '25 MIN', price: 8.9, ingredients: ['Quinoa', 'Black beans', 'Corn', 'Avocado', 'Salsa'], description: 'Bright, filling bowls ready for easy customizing.' }
  ,{ id: 'pork-lettuce-cups', title: 'Ginger pork lettuce cups', tag: 'LOW CARB', time: '25 MIN', price: 11.75, ingredients: ['Ground pork', 'Butter lettuce', 'Water chestnuts', 'Ginger', 'Soy sauce'], description: 'Crunchy, savory wraps that come together quickly.' }
];

const grid = document.querySelector('#recipes');
const template = document.querySelector('#recipe-template');
function money(value) { return `$${value.toFixed(2)}`; }
const categoryInfo = {
  'Vegetarian': { image: 'assets/vegetarian-bowl.png', note: 'Bright, generous, plant-forward cooking.' },
  'Quick & pantry': { image: 'assets/pasta.png', note: 'Fast recipes built from useful staples.' },
  'Meat & seafood': { image: 'assets/chicken.png', note: 'Easy centre-of-the-plate dinners.' },
  'Cozy & one-pot': { image: 'assets/soup.png', note: 'Low-fuss comfort with minimal cleanup.' },
  'Tacos & bowls': { image: 'assets/tacos.png', note: 'Fresh, flexible favorites for sharing.' }
};
function categoryFor(recipe) {
  if (recipe.tag === 'VEGETARIAN') return 'Vegetarian';
  if (['PANTRY', 'FLEXIBLE'].includes(recipe.tag)) return 'Quick & pantry';
  if (['COZY', 'ONE PAN'].includes(recipe.tag)) return 'Cozy & one-pot';
  if (['WEEKEND', 'LOW CARB'].includes(recipe.tag)) return 'Tacos & bowls';
  return 'Meat & seafood';
}
function render(list) {
  grid.innerHTML = '';
  document.querySelector('#recipe-count').textContent = list.length;
  Object.keys(categoryInfo).forEach(category => {
    const matching = list.filter(recipe => categoryFor(recipe) === category);
    if (!matching.length) return;
    const section = document.createElement('section');
    section.className = 'category-section';
    section.innerHTML = `<div class="category-heading"><div><p class="eyebrow">${category.toUpperCase()}</p><h3>${category}</h3></div><p>${categoryInfo[category].note}</p></div><div class="category-grid"></div>`;
    const cards = section.querySelector('.category-grid');
    matching.forEach(recipe => {
      const card = template.content.cloneNode(true);
      const image = card.querySelector('img');
      image.src = `assets/recipes/${recipe.id}.png`;
      image.alt = `${recipe.title} recipe`;
      card.querySelector('.tag').textContent = recipe.tag;
      card.querySelector('.time').textContent = recipe.time;
      card.querySelector('h3').textContent = recipe.title;
      card.querySelector('.description').textContent = recipe.description;
      card.querySelector('strong').textContent = money(recipe.price);
      const ingredients = card.querySelector('.ingredients');
      ingredients.innerHTML = recipe.ingredients.map(item => `<li>${item}</li>`).join('');
      const button = card.querySelector('.details');
      button.addEventListener('click', () => { ingredients.hidden = !ingredients.hidden; button.innerHTML = ingredients.hidden ? 'View ingredients <span>+</span>' : 'Hide ingredients <span>−</span>'; });
      cards.appendChild(card);
    });
    grid.appendChild(section);
  });
}
render(recipes);

document.querySelectorAll('.chip').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.chip.active').classList.remove('active'); button.classList.add('active');
  const filter = button.dataset.filter;
  render(recipes.filter(r => filter === 'all' || (filter === 'under-10' && r.price < 10) || (filter === 'vegetarian' && r.tag === 'VEGETARIAN') || (filter === 'quick' && Number.parseInt(r.time) < 30)));
}));

function guide(question) {
  const q = question.toLowerCase();
  const budget = Number((q.match(/\$?\s?(\d+(?:\.\d+)?)/) || [])[1]);
  const matchingIngredient = recipes.find(r => r.ingredients.some(i => i.toLowerCase().split(/\W+/).some(word => word.length > 2 && q.includes(word))));
  const affordable = matchingIngredient && (!budget || matchingIngredient.price <= budget) ? matchingIngredient : recipes.filter(r => !budget || r.price <= budget).sort((a,b) => a.price-b.price)[0];
  const pick = affordable || matchingIngredient || recipes[0];
  return `<strong>${pick.title}</strong> is a great fit at ${money(pick.price)} for two. You’ll need ${pick.ingredients.slice(0, 3).join(', ')}, plus a few pantry basics.`;
}
async function askAssistant(question) {
  const answer = document.querySelector('#answer');
  answer.textContent = 'Finding the best recipe match…';
  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, recipes })
    });
    if (!response.ok) throw new Error('Assistant unavailable');
    const result = await response.json();
    answer.textContent = result.answer;
  } catch {
    answer.innerHTML = `${guide(question)} <br><small>Running in local fallback mode until Gemini is configured.</small>`;
  }
}
document.querySelector('#question-form').addEventListener('submit', event => { event.preventDefault(); const question = event.currentTarget.question.value.trim(); if (question) askAssistant(question); });
