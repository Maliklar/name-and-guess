import { getResults } from "./api.js";
import { appendLocalStorage, convertToPercentage, getAsideRow, getCard, getErrorMessage, getGenderImage, getLocalStorage, removeAllChildren, updateAsideContent, validateInput } from "./methods.js";

// DOM Elements
const form = document.getElementById("form");
const genderPercentage = document.getElementById("gender-percentage");
const age = document.getElementById("age");
const genderImg = document.getElementById("gender-img");
const cardsContainer = document.getElementById("cards-container");
const loadingScreen = document.getElementById("loading-screen");

form.addEventListener('submit', async e => {
    e.preventDefault();
    const inputValue = new FormData(form).get("name");
    if (validateInput(inputValue)) {
        loadingScreen.classList.add("loading");
        populateDOM(await getResults(inputValue));
        loadingScreen.classList.remove("loading");

    } else {
        e.target[0].setCustomValidity("Name field can only contain characters from A to Z");
        e.target[0].reportValidity();
    }

});


async function populateDOM(result) {
    appendLocalStorage(result);
    // Clear previous results


    age.innerText = result.age;


    genderPercentage.innerHTML = convertToPercentage(result.genderProbability);
    genderImg.setAttribute("src", getGenderImage(result.gender));
    genderImg.style.visibility = "visible";


    removeAllChildren(cardsContainer);
    if (result.countries.length == 0)
        cardsContainer.appendChild(getErrorMessage())

    result.countries.forEach(country => {
        const card = getCard(country);
        cardsContainer.appendChild(card);
    });
}