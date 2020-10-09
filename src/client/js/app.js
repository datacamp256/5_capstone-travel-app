/* Global Variables */

function toEntry(temperature, date, comment) {
    return {temperature: temperature, date: date, comment: comment};
}

async function getWeatherOfTheDay(locationProperties) {
    const allWeather = await Client.fetcher_loadWeatherForecast(locationProperties.lat, locationProperties.lng);
    return allWeather.days.filter(day => day.valid_date === document.getElementById('start-input').value).shift();
}

/* Function called by event listener */
async function generateEntry(event) {
    event.preventDefault();
        Client.dom_hideError();
    let locationProperties;
    let weather;
    try {
        Client.countdown_initCountDown();
        locationProperties   = await Client.backend_loadGeoInformation(getCityName());
        weather = await getWeatherOfTheDay(locationProperties);
    } catch (error) {
        Client.dom_displayError(error);
    }
    console.log('app.generateEntry',locationProperties);
    console.log('app.generateEntry',weather);
}

function getCityName() {
    return document.getElementById('city-input').value;
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