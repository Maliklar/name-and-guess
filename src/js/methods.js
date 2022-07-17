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

function getCountryCard(country) {

}

export {
    validateInput,
    convertToPercentage,
    getGenderImage
}