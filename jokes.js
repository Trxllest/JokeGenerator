


let baseURL = "https://v2.jokeapi.dev/joke/Any?type=single";
let translationAPI = "https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20230704T234935Z.4c8b1b9b34791484.d773619c2575d193852466a82d240de04b719d37&ui=en";
let translateTextAPI = (text, lang) => `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20230704T234935Z.4c8b1b9b34791484.d773619c2575d193852466a82d240de04b719d37&ui=en&text=${text}&lang=${lang}`;
let selectedLang = null; // Hold selected Language value

const API_KEY = 'DZM7JMG-3VHMTC4-N5SY8FK-KN14A4G';


//Get supported languages

function getLanguages() {
    fetch(`${translationAPI}`).then(response => {
        response.json().then(data => {
            console.log(data);
            populateDropdownLanguage(data.langs);

        })
    })
}

function bindSelect() {
    document.querySelector('select#languages').addEventListener('change', e => {

        selectedLang = e.target.selectedOptions[0].value;
        console.log(selectedLang)
    })
}




function populateDropdownLanguage(list) {
    //Get the select
    let selectElement = document.querySelector('select#languages');
    for (let keys in list) {
        //Create a option 
        const optionElement = document.createElement('option');
        optionElement.value = keys;
        optionElement.innerText = list[keys]
        //Add to the select element
        selectElement.appendChild(optionElement);
    }
}


//attach a click event to the button



// Waits for page to load

document.addEventListener('DOMContentLoaded', () => {
    let buttonElement = document.getElementById('getJoke');
    if (buttonElement) {
        buttonElement.addEventListener('click', () => {
            fetch(baseURL).then((response) => {
                response.json().then(data => {
                    const jokeText = data.joke;
                    const jokeSection = document.querySelector('.text-box');
                    jokeSection.innerHTML = jokeText

                }, () => {
                    alert('Failed to get a Joke, try again....')
                })
            })
        })
    }

    let translateButton = document.getElementById('translate');
    if (translateButton) {
        translateButton.addEventListener('click', () => {
            const joke = document.querySelector('.text-box');
            // checks if there is a joke to be translated

            if (!joke.innerText.length) {
                alert('Sorry there are no jokes to translate :(');
                return;
            }
            // checks if a langauge is selected

            if (!selectedLang) {
                alert('Select a language to translate to');
                return;
            }

            fetch(translateTextAPI(joke.innerText, selectedLang), {
                method: 'POST',
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                response.json().then(data => {
                    const jokeText = data.text;
                    const jokeSection = document.querySelector('.text-box');
                    jokeSection.innerHTML = jokeText

                }, () => {
                    alert('Failed to translate a Joke, try again....')
                })
            })
        })

    }





    // Get all the languages
    getLanguages();
    bindSelect();

})
