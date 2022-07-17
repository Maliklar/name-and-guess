// APIs Points
const GENDER_API = "https://api.genderize.io/?name=";
const NATION_API = "https://api.nationalize.io?name=";
const AGE_API = "https://api.agify.io?name=";
const COUNTRY_API = "https://restcountries.com/v3.1/alpha?codes=";

async function getResults(inputValue) {
    const gender = await getGender(inputValue);
    const age = await getAge(inputValue);
    const nationalities = await getNationalities(inputValue);
    const countries = await getFlags(nationalities);
    return {
        gender: gender.gender,
        genderProbability: gender.probability,
        age: age.age,
        countries,
        name: inputValue.charAt(0).toUpperCase() + inputValue.slice(1),
        date: new Date().getTime(),
    }

}

async function getAge(inputValue) {
    return fetch(`${AGE_API}${inputValue}`)
        .then(res => res.json())
}

async function getGender(inputValue) {
    return fetch(`${GENDER_API}${inputValue}`)
        .then(res => res.json())
}

async function getNationalities(inputValue) {
    return fetch(`${NATION_API}${inputValue}`).then(res => res.json())
        .then(data => {
            let codes = "";
            data.country.forEach(country => {
                codes += country.country_id + ",";
            });
            return codes;
        });
}

async function getFlags(codes) {
    let result = [];
    return fetch(`${COUNTRY_API}${codes}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(country => {
                const obj = {
                    flag: country.flags.png,
                    name: country.name.common,
                };
                result.push(obj);
            });
            return result;
        });
}
export {
    getResults
}