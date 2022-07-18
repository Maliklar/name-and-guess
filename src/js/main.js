import { getResults } from "./api.js";
import Utility from "./utility.js";

// DOM Elements
const form = document.getElementById("form");
const genderPercentage = document.getElementById("gender-percentage");
const age = document.getElementById("age");
const genderImg = document.getElementById("gender-img");
const cardsContainer = document.getElementById("cards-container");
const loadingScreen = document.getElementById("loading-screen");
const errorMessage = document.getElementById("error-msg");

form.addEventListener('submit', async e => {
    e.preventDefault();
    errorMessage.style.display = "none";

    const inputValue = new FormData(form).get("name");
    if (Utility.validateInput(inputValue)) {
        loadingScreen.classList.add("loading");
        populateDOM(await getResults(inputValue));
        loadingScreen.classList.remove("loading");

    } else {
        errorMessage.style.display = "block";
    }
});


async function populateDOM(result) {
    Utility.appendLocalStorage(result);

    age.innerText = result.age;
    genderPercentage.innerHTML = Utility.convertToPercentage(result.genderProbability);
    genderImg.setAttribute("src", Utility.getGenderImage(result.gender));
    genderImg.style.visibility = "visible";

    Utility.removeAllChildren(cardsContainer);

    if (result.countries.length == 0)
        cardsContainer.appendChild(Utility.getErrorMessage())

    result.countries.forEach(country => {
        const card = Utility.getCard(country);
        cardsContainer.appendChild(card);
    });
}