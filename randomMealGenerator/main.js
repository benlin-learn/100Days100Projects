const getMealBtn = document.querySelector('#getMealBtn');

getMealBtn.addEventListener('click', () => {
  // const
  function fetchData() {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((res) => {
        console.log(res.data.meals[0]);
        renderMeal(res.data.meals[0]);
      });
  }
  fetchData();
});

function renderMeal(data) {
  let output = `
  <div class="ui grid">
    <div class="ui eight wide column">
      <div class="ui segment">
        <img class="ui image" src="${data.strMealThumb}"/>
        <div class="ui list">
          <div class="item">Category: ${data.strCategory}</div>
          <div class="item">Area: ${data.strArea}</div>
        </div>
        
        <h3>Ingredients:</h3>
        <ul class="ui list">
          ${renderRecipe(data)}
        </ul>
      
      </div>
    </div>
    <div class="ui eight wide column">
      <h1 class="header">${data.strMeal}</h1>
      <div class="ui piled segment">
        <p>${data.strInstructions}</p>
      </div>
    </div>
  </div>
  <div class="ui section divider"></div>
  <h1 class="ui header">Video Recipe</h1>
  <div class="ui embed" >
    <iframe
      src="${renderYouTubeLink(data.strYoutube)}"
      frameborder="0"
    ></iframe>
  </div>`;
  document.querySelector('#output').innerHTML = output;
}
function renderYouTubeLink(link) {
  return link.replace('/watch?v=', '/embed/');
}

function renderRecipe(data) {
  const IngredientRegex = /^strIngredient[0-9][0-9]?$/gi;
  const MeasureRegex = /^strMeasure[0-9][0-9]?$/gi;
  let ingredients = [];
  let Measure = [];
  // let recipe = {};
  let output = '';
  for (let key in data) {
    if (data[key] && key.match(IngredientRegex)) {
      ingredients.push(data[key]);
    }
    if (key.match(MeasureRegex)) {
      Measure.push(data[key]);
    }
  }

  for (let i = 0; i < ingredients.length; i++) {
    // recipe[ingredients[i]] = Measure[i];
    output += `
    <li>${ingredients[i]} - ${Measure[i]}</li>
    `;
  }

  // console.log(ingredients);
  // console.log(Measure);
  // console.log(recipe);
  // console.log(output);
  return output;
}
