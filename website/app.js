/* Global Variables */
let owmApiKey;
const BUTTON_ID = 'generate';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API

function loadOWMApiKey() {
    return fetch('http://localhost:8080/openWeatherMapApiKey')
        .then(function (response) {
            return response.text().then(function (text) {
                return text;
            });
        });
}

document.addEventListener('DOMContentLoaded', async function () {
    owmApiKey = await loadOWMApiKey();
});

// Event listener to add function to existing HTML DOM element
document.getElementById(BUTTON_ID).addEventListener('click', generateEntry);

async function loadTemperature(zipCode) {
    console.log(`Get the temperature for US ZIP ${zipCode} from openweathermap.org.`)
    let result = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=85051,us&appid=${owmApiKey}`)
        .then(response => response.json())
        .then(data => data.main.temp);
    console.log(result);
    return result;
}

/* Function called by event listener */
function generateEntry() {
    const temperature = loadTemperature();
    console.log(temperature);
}

/* Function to GET Web API Data*/

/* Function to POST data */


/* Function to GET Project Data */