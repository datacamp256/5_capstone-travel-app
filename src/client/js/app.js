const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

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
    let imageUrl;
    try {
        Client.countdown_initCountDown();
        locationProperties = await Client.fetcher_loadGeoInformation(getCityName());
        weather = await getWeatherOfTheDay(locationProperties);
        imageUrl = await Client.fetcher_loadPixabyImageUrl([
            locationProperties.location,
            locationProperties.region,
            countries.getName(locationProperties.country, 'en')]);
    } catch (error) {
        Client.dom_displayError(error);
    }
    console.log('app.generateEntry locationProperties', locationProperties);
    console.log('app.generateEntry weather', weather);
    console.log('app.generateEntry imageMetaData', imageUrl);
    Client.dom_displayWeather(weather);
    Client.dom_displayLocationImage(imageUrl);
}

function getCityName() {
    return document.getElementById('city-input').value;
}

module.exports.generateEntry = generateEntry;