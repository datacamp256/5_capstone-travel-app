/* Global Variables */
let owmApiKey;
const BUTTON_ID = 'generate';
const ZIP_INPUT_ID = 'zip';
const USER_INPUT_ID = 'feelings';
const DEFAULT_ZIP_CODE = 94040;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

function toEntry(temperature, date, comment) {
    return {temperature: temperature, date: date, comment: comment};
}

function fromEntry(entry) {
    return [entry.temperature, entry.date, entry.comment];
}

// Personal API Key for OpenWeatherMap API

function loadOWMApiKey() {
    return fetch('/openWeatherMapApiKey')
        .then(function (response) {
            return response.text();
        });
}

document.addEventListener('DOMContentLoaded', async function () {
    owmApiKey = await loadOWMApiKey();
});

// Event listener to add function to existing HTML DOM element
document.getElementById(BUTTON_ID).addEventListener('click', generateEntry);

/* Function called by event listener */
function generateEntry() {
    loadTemperature(getZipCode())
        .then(temperature => postEntry('/entries', toEntry(temperature, d, getUserResponse())))
        .then(() => loadEntries())
        .then((entries) => updateEntriesList(entries));
}

/* Function to GET Web API Data*/

async function loadTemperature(zipCode) {
    console.log(`Get the temperature for US ZIP ${zipCode} from openweathermap.org.`)
    let result = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=85051,us&appid=${owmApiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => data.main.temp);
    console.log(`Temperature for ${zipCode} is ${result}.`);
    return result;
}

function getZipCode() {
    const zipCode = document.getElementById(ZIP_INPUT_ID).value;
    return zipCode ? zipCode : DEFAULT_ZIP_CODE;
}

/* Function to POST data */
async function postEntry(url, entry) {
    console.log(`Sending ${JSON.stringify(entry)} to backend.`);
    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(entry)
    });
}

function getUserResponse() {
    const userResponse = document.getElementById(USER_INPUT_ID).value;
    return userResponse ? userResponse : "I'm feeling a little cold...";
}

/* Function to GET Project Data */
async function loadEntries() {
    console.log('Loading all entries from backend');
    return fetch('/entries')
        .then(response => response.json());
}

function updateEntriesList(jsonResponse) {
    console.log(`Got ${jsonResponse.entries.length} entries from backend.`);
    const latestEntry = jsonResponse.entries.slice(-1)[0];
    document.getElementById('date').innerText = latestEntry.date;
    document.getElementById('temp').innerText = latestEntry.temperature + ' °F';
    document.getElementById('content').innerText = latestEntry.comment;

}