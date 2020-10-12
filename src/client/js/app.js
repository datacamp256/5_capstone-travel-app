async function getWeatherOfTheDay(locationProperties) {
    const allWeather = await Client.fetcher_loadWeatherForecast(locationProperties.lat, locationProperties.lng);
    return allWeather.days.filter(day => day.valid_date === document.getElementById('start-input').value).shift();
}

/* Function called by event listener */
async function planTravel(event) {
    let locationProperties;
    let countryInformation;
    let travelDate;
    let weather;
    let imageUrl;
    event.preventDefault();

    Client.dom_hideError();
    try {
        travelDate = Client.countdown_initCountDown();
        locationProperties = await Client.fetcher_loadGeoInformation(Client.dom_getCityName());
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
    Client.dom_displayWeather(weather);
    Client.dom_displayLocationImage(imageUrl);
    Client.dom_updateResult(true, locationProperties.location, travelDate, countryInformation);
}


module.exports.app_planTravel = planTravel;