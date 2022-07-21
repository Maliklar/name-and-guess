import { getResults } from "./api.js";
import Utility from "./utility.js";

// DOM Elements
const form = document.getElementById("form");
const errorMessage = document.getElementById("error-msg");
const loadingScreen = document.getElementById("loading-screen");

form.addEventListener('submit', async e => {
    e.preventDefault();
    errorMessage.style.display = "none";

    const inputValue = new FormData(form).get("name");
    if (Utility.validateInput(inputValue)) {
        loadingScreen.classList.add("loading");
        const previous = Utility.getPreviousResults(inputValue);
        // Check if the name exits in the localStorage first
        if (previous) {
            Utility.populateDOM(previous);
        } else {
            const result = await getResults(inputValue);
            Utility.populateDOM(result);
            Utility.appendLocalStorage(result);
        }

        loadingScreen.classList.remove("loading");
    } else {
        errorMessage.style.display = "block";
    }
});