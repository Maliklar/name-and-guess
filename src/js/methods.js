// Methods
function validateInput(value) {
    // checking for space only input (Empty input)
    // Regex Expression (Find any character other than English alphabits)
    if (value.match("[^a-zA-Z]"))
        return false;
    return true;
}

function convertToPercentage(num) {
    return Math.round(+num * 100) + "%";
}

function getGenderImage(gender) {
    if (gender === 'male')
        return './src/img/male.svg';

    else if (gender === "female")
        return './src/img/female.svg';
    else
        return "./src/img/no_results.png";
}

function getCard(country) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const img = document.createElement("img");
    img.setAttribute("src", country.flag);
    img.setAttribute("alt", country.name);
    const divider = document.createElement("divider");
    divider.setAttribute("class", "divider");
    const name = document.createElement("h3");
    name.innerText = country.name;
    card.appendChild(img);
    card.appendChild(divider);
    card.appendChild(name);

    return card;
}

function getErrorMessage() {
    const container = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", "./src/img/no_results.png");
    img.setAttribute("alt", "No results Icon");
    img.setAttribute("height", "80");

    const p = document.createElement("p");
    p.innerText = "No Results";
    p.style.fontSize = "1rem";
    container.appendChild(img);
    container.appendChild(p);
    return container;
}

function appendLocalStorage(data) {
    let storage;
    if (localStorage.getItem("results") === null) {
        storage = [data];
    } else {
        storage = JSON.parse(localStorage.getItem("results"));
        storage.push(data);
    }
    localStorage.setItem("results", JSON.stringify(storage));
    updateAsideContent(data);
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem("results")) || [];
}

function initializeAsideContent() {
    getLocalStorage().forEach(element => {
        updateAsideContent(element);
    });
}

function getAsideRow(data) {
    const row = document.createElement("div");
    const name = document.createElement("h2");
    const img = document.createElement("img");
    const age = document.createElement("p");
    const date = document.createElement("span");
    row.setAttribute("class", "aside-row");
    img.setAttribute("src", getGenderImage(data.gender));
    img.setAttribute("alt", data.gender);
    img.setAttribute("height", "30");

    name.innerText = data.name;
    if (data.age != null)
        age.innerText = data.age + " Years Old";
    date.innerText = dateToAgoFormat(data.date);

    row.appendChild(name);
    row.appendChild(img);
    row.appendChild(age);
    row.appendChild(date);
    return row;

}


function updateAsideContent(result) {
    const asideContent = document.getElementById("aside-content");
    const row = getAsideRow(result);
    asideContent.appendChild(row);
}

function dateToAgoFormat(date) {
    let current = new Date().getTime();
    let diff = (current - date) / 1000;

    if (diff < 60) {
        return "just now";
    } else if (diff < 3600) {
        return Math.floor(diff / 60) + " minute ago";
    } else if (diff >= 3600 && diff < 86400) {
        return Math.floor(diff / 3600) + " hour ago";
    } else if (diff >= 86400 && diff < 604800) {
        return Math.floor(diff / 86400) + " day ago";
    } else if (diff >= 604800 && diff < 2628000) {
        return Math.floor(diff / 604800) + " week ago";
    } else if (diff >= 2628000 && diff < 31540000) {
        return Math.floor(diff / 2628000) + " month ago";
    } else {
        return " long time ago";
    }

}
initializeAsideContent();

export {
    validateInput,
    convertToPercentage,
    getGenderImage,
    getCard,
    appendLocalStorage,
    getLocalStorage,
    getAsideRow,
    updateAsideContent,
    getErrorMessage,
}