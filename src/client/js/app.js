async function getWeatherOfTheDay(locationProperties) {
    const allWeather = await Client.fetcher_loadWeatherForecast(locationProperties.lat, locationProperties.lng);
    return allWeather.days.filter(day => day.valid_date === document.getElementById('start-input').value).shift();
}

/* Function called by event listener */
async function generateEntry(event) {
    let locationProperties;
    let countryInformation;
    let travelDate;
    let weather;
    let imageUrl;
    event.preventDefault();

    Client.dom_hideError();
    try {
        travelDate = Client.countdown_initCountDown();
        locationProperties = await Client.fetcher_loadGeoInformation(getCityName());
        weather = await getWeatherOfTheDay(locationProperties);
        countryInformation = await Client.fetcher_loadCountryInformation(locationProperties.country);
        imageUrl = await Client.fetcher_loadPixabayImageUrl([
            locationProperties.location,
            locationProperties.region,
            countryInformation.name
        ]);
    } catch (error) {
        Client.dom_displayError(error);
    }
    // console.log('app.generateEntry locationProperties', locationProperties);
    // console.log('app.generateEntry weather', weather);
    // console.log('app.generateEntry imageMetaData', imageUrl);
    // console.log('app.generateEntry countryInformation', countryInformation);
    Client.dom_displayWeather(weather);
    Client.dom_displayLocationImage(imageUrl);
    Client.dom_updateResult(true, locationProperties.location, travelDate, countryInformation);
}

function getCityName() {
    return document.getElementById('city-input').value;
}

module.exports.app_generateEntry = generateEntry;