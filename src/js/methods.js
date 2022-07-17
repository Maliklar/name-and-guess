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
    if (gender === 'male') {
        return './src/img/male.svg';
    }
    return './src/img/female.svg';
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
    return JSON.parse(localStorage.getItem("results"));
}

function initializeAsideContent() {
    const storage = getLocalStorage();
    storage.forEach(element => {
        updateAsideContent(element);
    });
}

function getAsideRow(data) {
    console.log(data);

    const row = document.createElement("div");
    const name = document.createElement("h2");
    const img = document.createElement("img");
    const age = document.createElement("p");
    row.setAttribute("class", "aside-row");
    img.setAttribute("src", getGenderImage(data.gender));
    img.setAttribute("alt", data.gender);
    img.setAttribute("height", "30");

    name.innerText = data.name;
    age.innerText = data.age + " Years Old";

    row.appendChild(name);
    row.appendChild(img);
    row.appendChild(age);
    return row;

}


function updateAsideContent(result) {
    const asideContent = document.getElementById("aside-content");
    const row = getAsideRow(result);
    asideContent.appendChild(row);
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
}