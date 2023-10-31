var catDropDown = document.getElementById("cats");
var imgContainer = document.getElementById("image-container");

catDropDown.addEventListener("change", (event) => {
    catID = event.target.value;
    fetch('https://api.thecatapi.com/v1/images/search?breed_ids=' + catID, {
        'x-api-key' : 'live_dzFZqaVgKQBAScnhGBofCjWwQKgSKVTqFzeKy0TuyK0lFEOfK4Auoy6aFsTSWu5s'
    })
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log(response.status);
                    return
                } else {
                    response.json().then(function(data) {
                        //image is stored in an array, so we need to access it with [0] index
                        catImage = data[0].url;
                        //adds url to "src" attribute
                        imgContainer.src = catImage;
                        //appends image to body of document (TODO: change to inside container element)
                        document.body.append(catImageEl);
                        });
                
                }
            }
        );
});


const generateButton = document.getElementById('generateButton');
const cocktailDetails = document.getElementById('cocktailDetails');

generateButton.addEventListener('click', () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            if (data.drinks && data.drinks.length > 0) {
                const cocktail = data.drinks[0];
                displayCocktail(cocktail);
            } else {
                cocktailDetails.innerHTML = 'No cocktail found.';
            }
        })
});

function displayCocktail(cocktail) {
    cocktailDetails.innerHTML = `
        <h2>${cocktail.strDrink}</h2>
        <p><strong>Category:</strong> ${cocktail.strCategory}</p>
        <p><strong>Glass:</strong> ${cocktail.strGlass}</p>
        <p><strong>Instructions:</strong> ${cocktail.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul>
            ${listIngredients(cocktail)}
        </ul>
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" width="150">
    `;
}

function listIngredients(cocktail) {
    let ingredientsList = '';
    for (let i = 1; i <= 2; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredientsList += `<li>${measure ? `${measure} of ` : ''}${ingredient}</li>`;
        }
    }
    return ingredientsList;
}