// add EventListener
const searchButton = document.getElementById('button');
searchButton.addEventListener('click', SearchForMeal);

//search meal and fetch from API
function SearchForMeal(element) {
    element.preventDefault();

    // clear single meal
    const singleMealElement = document.getElementById('single-meal');
    singleMealElement.innerHTML = '';

    //get search meal
    const searchMeal = document.getElementById('search');
    const meal = searchMeal.value;


    //check for empty
    if (meal.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.meals === null) {
                    const resultHeading = document.getElementById('result-heading');
                    resultHeading.innerHTML = `<p>There is no search result.Try again !</p>`

                }
                else {
                    const mealsElement = document.getElementById('meals');
                    mealsElement.innerHTML = data.meals.map(meal => `
            <div class="meal">
            <img onclick="displayIngredient('${meal.strMeal}')" class="meal-pointer" src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealId="${meal.idMeal}">
            <h3 class="meal-pointer">${meal.strMeal}</h3>
         
            </div>
            </div>`)
                        .join('');
                }
            })
        search.value = '';
    }

    else {
        alert('Please enter a search term');
    }

}
//Ingredient Part
const displayIngredient = meal => {

    const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=${meal}`
    fetch(url)
        .then(res => res.json())
        .then(data => renderIngredient(data.meals));



}
const renderIngredient = ingredients => {

    const ingredientImage = document.getElementById('ingredient-image');

    const ingredientContainer = document.getElementById('ingredient-container');


    for (let i = 1; i < 10; i++) {

        const li = document.createElement('li');
        li.innerText = ingredients[i].strIngredient;
        ingredientContainer.appendChild(li);
        const img = document.createElement('img')
        img.innerHTML = ingredients[i].strMealThumb;
        ingredientImage.appendChild(img);
    };
}





















