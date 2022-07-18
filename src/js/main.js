import { getResults } from "./api.js";
import { appendLocalStorage, convertToPercentage, getAsideRow, getCard, getErrorMessage, getGenderImage, getLocalStorage, updateAsideContent, validateInput } from "./methods.js";

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

    if (result.age == null)
        age.appendChild(getErrorMessage());
    else
        age.innerText = result.age;

    if (result.gender == null) {
        genderPercentage.appendChild(getErrorMessage());
    } else {
        genderPercentage.innerHTML = convertToPercentage(result.genderProbability);
        genderImg.setAttribute("src", getGenderImage(result.gender));
        genderImg.style.visibility = "visible";
    }

    if (result.countries.length == 0)
        cardsContainer.appendChild(getErrorMessage())

    result.countries.forEach(country => {
        const card = getCard(country);
        cardsContainer.appendChild(card);
    });
}