import { getResults } from "./api.js";
import { appendLocalStorage, convertToPercentage, getAsideRow, getCard, getGenderImage, getLocalStorage, updateAsideContent, validateInput } from "./methods.js";

// DOM Elements
const form = document.getElementById("form");
const genderPercentage = document.getElementById("gender-percentage");
const age = document.getElementById("age");
const genderImg = document.getElementById("gender-img");
const cardsContainer = document.getElementById("cards-container");

form.addEventListener('submit', async e => {
    e.preventDefault();
    const inputValue = new FormData(form).get("name");
    if (validateInput(inputValue)) {
        populateDOM(await getResults(inputValue));

    } else {
        e.target[0].setCustomValidity("Name field can only contain characters from A to Z");
        e.target[0].reportValidity();
    }
});


async function populateDOM(result) {
    appendLocalStorage(result);


    age.innerText = result.age;
    genderPercentage.innerHTML = convertToPercentage(result.genderProbability);
    genderImg.setAttribute("src", getGenderImage(result.gender));


    result.countries.forEach(country => {
        const card = getCard(country);
        cardsContainer.appendChild(card);
    });
}