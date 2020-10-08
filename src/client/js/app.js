/* Global Variables */

const CITY_INPUT = 'city-input';

function toEntry(temperature, date, comment) {
    return {temperature: temperature, date: date, comment: comment};
}

/* Function called by event listener */
function generateEntry(event) {
    event.preventDefault();
    Client.initCountDown();
    loadTemperature(getZipCode())
        .then(temperature => postEntry('http://localhost:8081/entries', toEntry(temperature, new Date().toLocaleString(), getUserResponse())))
        .then(() => loadEntries())
        .then((entries) => updateEntriesList(entries));
}

/* Function to GET Web API Data*/

async function loadTemperature(zipCode) {
    let key =  Client.getGeonamesApiKey();
    console.log(key);
    let result = await fetch(`http://api.geonames.org/postalCodeSearchJSON?username=${key}&placename=${encodeURIComponent(zipCode)}&maxRows=10&style=MEDIUM`)
        .then(response => response.json());
    let newVar = {
        location: result.postalCodes[0].placeName,
        lat: result.postalCodes[0].lat,
        lng: result.postalCodes[0].lng,
        region: result.postalCodes[0].adminName1,
        country: result.postalCodes[0].countryCode
    };
    console.log(newVar);
    return newVar;
}

function getZipCode() {
    const zipCode = document.getElementById(CITY_INPUT).value;
    return zipCode ? zipCode : 'San Francisco';
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
    return fetch('http://localhost:8081/entries')
        .then(response => response.json());
}

function updateEntriesList(jsonResponse) {
    console.log(`Got ${jsonResponse.entries.length} entries from backend.`);
    const latestEntry = jsonResponse.entries.slice(-1)[0];
    document.getElementById('date').innerText = latestEntry.date;
    document.getElementById('temp').innerText = latestEntry.temperature + ' °F';
    document.getElementById('content').innerText = latestEntry.comment;

}

module.exports.generateEntry = generateEntry;