// Utility Class
// Contains all neccessary methods to manipulate the DOM and other utility methods

class Utility {



    // Load The previous results (Latest Guesses) when page is opend
    constructor() {
        this.genderPercentage = document.getElementById("gender-percentage");
        this.age = document.getElementById("age");
        this.genderImg = document.getElementById("gender-img");
        this.cardsContainer = document.getElementById("cards-container");
        this.getLocalStorage().forEach(element => {
            this.updateAsideContent(element);
        });
    }

    validateInput(value) {
        // Regex Expression (Find any character other than English alphabits)
        if (value.match("[^a-zA-Z]"))
            return false;
        return true;
    }

    convertToPercentage(num) {
        return Math.round(+num * 100) + "%";
    }

    getGenderImage(gender) {
        if (gender === 'male')
            return './src/img/male.svg';
        else if (gender === "female")
            return './src/img/female.svg';
        else
            return "./src/img/no_results.png";
    }

    getCard(country) {
        const card = document.createElement("div");
        const img = document.createElement("img");
        const divider = document.createElement("divider");
        const name = document.createElement("h3");
        const probability = document.createElement("p");

        card.setAttribute("class", "card");
        img.setAttribute("src", country.flag);
        img.setAttribute("alt", country.name);
        divider.setAttribute("class", "divider");

        name.innerText = country.name;
        probability.innerText = this.convertToPercentage(country.probability);

        card.appendChild(img);
        card.appendChild(divider);
        card.appendChild(name);
        card.appendChild(probability);

        return card;
    }

    // Error Messages are displayed in case there are no results from the API
    getErrorMessage() {
        const container = document.createElement("div");
        const img = document.createElement("img");
        const p = document.createElement("p");

        img.setAttribute("src", "./src/img/no_results.png");
        img.setAttribute("alt", "No results Icon");
        img.setAttribute("height", "80");

        p.innerText = "No Results";
        p.style.fontSize = "1rem";
        container.appendChild(img);
        container.appendChild(p);
        return container;
    }

    appendLocalStorage(data) {
        let storage = JSON.parse(localStorage.getItem("results")) || [];
        storage.push(data);
        localStorage.setItem("results", JSON.stringify(storage));
        this.updateAsideContent(data);
    }

    getLocalStorage() {
        return JSON.parse(localStorage.getItem("results")) || [];
    }

    // Creates a row to be displayed on the aside menue (Latest Guesses)
    getAsideRow(data) {
        const row = document.createElement("div");
        const name = document.createElement("h2");
        const img = document.createElement("img");
        const age = document.createElement("p");
        const date = document.createElement("span");

        row.setAttribute("class", "aside-row");
        row.setAttribute("data-name", data.name.toLowerCase());
        img.setAttribute("src", this.getGenderImage(data.gender));
        img.setAttribute("alt", data.gender);
        img.setAttribute("height", "30");

        name.innerText = data.name;
        age.innerText = (data.age) ? ("Age: " + data.age) : "";
        date.innerText = this.dateToAgoFormat(data.date);

        row.appendChild(name);
        row.appendChild(img);
        row.appendChild(age);
        row.appendChild(date);

        row.addEventListener("click", () => {
            this.populateDOM(this.getPreviousResults(row.dataset.name));
        })

        return row;
    }

    getPreviousResults(name) {
        const results = this.getLocalStorage();
        return results.find((val) => {
            if (val.name.toLowerCase() == name.toLowerCase()) {
                return val;
            }
        })
    }

    updateAsideContent(result) {
        const asideContent = document.getElementById("aside-content");
        const row = this.getAsideRow(result);
        asideContent.prepend(row);
    }

    // Additional: display time passes since the last guesses were added.
    dateToAgoFormat(date) {
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

    // Clears previous results
    removeAllChildren(element) {
        while (element.firstChild)
            element.removeChild(element.firstChild);
    }


    async populateDOM(result) {
        this.age.innerText = result.age;
        this.genderPercentage.innerHTML = this.convertToPercentage(result.genderProbability);
        this.genderImg.setAttribute("src", this.getGenderImage(result.gender));
        this.genderImg.style.visibility = "visible";

        this.removeAllChildren(this.cardsContainer);

        if (result.countries.length == 0)
            this.cardsContainer.appendChild(this.getErrorMessage());

        result.countries.forEach(country => {
            const card = this.getCard(country);
            this.cardsContainer.appendChild(card);
        });
    }
}

export default new Utility();