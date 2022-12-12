let searchBtn = document.getElementById(`search-btn`)
let recipes = document.getElementById(`Recipe`)

searchBtn.addEventListener(`click`, getList)
recipes.addEventListener(`click`, getRecipe)


function getList() {
    let inputTxt = document.getElementById(`searchbar-input`).value.trim()

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = ""
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                <div class="recipe-item" data id = "${meal.idMeal}">
                    <div class="recipe-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                        <div class="recipe-name">
                            <h3>${meal.strMeal}</h3>  
                            <a href="#" class="recipe-btn">Watch recipe on Youtube</a>
                            <a href="#" class="recipe-btn2">Read recipe online</a>
                        </div>
                </div>`;
                })
                recipes.classList.remove(`missing`)
            } else {
                html = "This ingredient isn't available, please choose a different one!";
                recipes.classList.add('missing');
            }
            recipes.innerHTML = html
        })
}

function getRecipe(e) {
    
    if (e.target.classList.contains(`recipe-btn`)) {
   
        let name = e.target.parentElement.parentElement.children[1].children[0].textContent
        
        let nameWithPlus = name.replaceAll(' ', '+')

        window.open(`https://duckduckgo.com/?q=!ducky+${nameWithPlus}+site%3Ayoutube.com`);
    }

    if (e.target.classList.contains(`recipe-btn2`)) { //rename
   
        let name = e.target.parentElement.parentElement.children[1].children[0].textContent
        
        let nameWithPlus = name.replaceAll(' ', '+')

        window.open(`https://duckduckgo.com/?q=!ducky+${nameWithPlus}`);
    }
}

