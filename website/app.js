/* Global Variables */
let owmApiKey;
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

/* Function called by event listener */

/* Function to GET Web API Data*/

/* Function to POST data */


/* Function to GET Project Data */