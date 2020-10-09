/* Global Variables */

const CITY_INPUT = 'city-input';

function toEntry(temperature, date, comment) {
    return {temperature: temperature, date: date, comment: comment};
}

/* Function called by event listener */
function generateEntry(event) {
    event.preventDefault();
    Client.dom_hideError();
    try{
        Client.countdown_initCountDown();
    } catch (error){
        Client.dom_displayError(error);
    }
    Client.backend_loadGeoInformation(getZipCode())
        .then(temperature => postEntry('http://localhost:8081/entries', toEntry(temperature, new Date().toLocaleString(), getUserResponse())))
        .then(() => loadEntries())
        .then((entries) => updateEntriesList(entries));
}

/* Function to GET Web API Data*/



function getZipCode() {
    const zipCode = document.getElementById(CITY_INPUT).value;
    return zipCode ? zipCode : 'San Francisco';
}

/* Function to POST data */
async function postEntry(url, entry) {
    console.log(`Sending ${JSON.stringify(entry)} to backend.`);
    // await fetch(url, {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(entry)
    // });
}

function getUserResponse() {
    // const userResponse = document.getElementById(USER_INPUT_ID).value;
    // return userResponse ? userResponse : "I'm feeling a little cold...";
}

/* Function to GET Project Data */
async function loadEntries() {
    console.log('Loading all entries from backend');
    return fetch('http://localhost:8081/entries')
        .then(response => response.json());
}

function updateEntriesList(jsonResponse) {
    console.log(`Got ${jsonResponse.entries.length} entries from backend.`);
    // const latestEntry = jsonResponse.entries.slice(-1)[0];
    // document.getElementById('date').innerText = latestEntry.date;
    // document.getElementById('temp').innerText = latestEntry.temperature + ' °F';
    // document.getElementById('content').innerText = latestEntry.comment;

}

module.exports.generateEntry = generateEntry;