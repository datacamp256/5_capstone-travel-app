let geonamesApiKey;
let weatherbitApiKey;
let pixabyApiKey;

//public functions here

async function loadApiKeys() {
    const promisedKeys = ['geonames', 'weatherbit','pixaby'].map(async serviceId =>
        fetch('http://localhost:8081/loadApiKey?application=' + serviceId)
            .then(response => response.text())
    );
    [geonamesApiKey, weatherbitApiKey, pixabyApiKey] = await Promise.all(promisedKeys);
}

async function loadGeoInformation(city) {
    const url = createGeoInformationRequestAddress(city);
    const result = await fetch(url).then(response => response.json());
    if (result.postalCodes.length === 0) {
        throw `Could not find a city with the name '${city}'`;
    }
    return extractLocationProperties(result);
}

async function loadWeatherForecast(lat, lng) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherbitApiKey}&lat=${lat}&lon=${lng}`;
    const weatherbitForecast = await fetch(url).then(response => response.json());
    return extractWeatherForecast(weatherbitForecast);
}

async function loadPixabyImageUrl(searchStrings) {
    if (searchStrings.length === 0) {
        return 'NO_IMAGE';
    }
    const url = createPixabyRequestAddress(searchStrings.shift());
    let response = await fetch(url).then(response => response.json());
    if (response.totalHits !== 0) {
        return response.hits[Math.floor(Math.random() * response.hits.length)].webformatURL;
    } else {
        return loadPixabyImageUrl(searchStrings);
    }
}


// private functions here

function extractWeatherForecast(weatherbitForecast) {
    const forecasts = {days: []};
    weatherbitForecast.data.forEach(day => {
        forecasts.days.push({
            valid_date: day.valid_date,
            icon: day.weather.icon,
            description: day.weather.description,
            temp: day.temp,
            probability_of_precipitation: day.pop,
            wind_spd: day.wind_spd,
            wind_direction: day.wind_cdir_full
        })
    });
    return forecasts;
}

function extractLocationProperties(result) {
    return {
        location: result.postalCodes[0].placeName,
        region: result.postalCodes[0].adminName1,
        country: result.postalCodes[0].countryCode,
        lng: result.postalCodes[0].lng,
        lat: result.postalCodes[0].lat
    };
}


function createPixabyRequestAddress(name) {
    const parameters = [
        `key=${pixabyApiKey}`,
        'q=' + encodeURIComponent(name),
        // 'lang=en',
        'image_type=photo',
        'min_width=100',
        'min_height=100',
        'savesearch=true',
        'order=popular',
        'per_page=20',//Accepted values: 3 - 200, default 20
        'pretty=false'
    ];
    return 'https://pixabay.com/api/?' + parameters.join('&');
}

function createGeoInformationRequestAddress(city) {
    const parameters = [
        `username=${geonamesApiKey}`,
        `placename=${encodeURIComponent(city)}`,
        'maxRows=10',
        'style=MEDIUM',
        'countryBias=US',
        'countryBias=DE',
        'countryBias=IN',
    ];
    return 'http://api.geonames.org/postalCodeSearchJSON?' + parameters.join('&');
}

// exports
module.exports.fetcher_loadApiKeys = loadApiKeys;
module.exports.fetcher_loadGeoInformation = loadGeoInformation;
module.exports.fetcher_loadWeatherForecast = loadWeatherForecast;
module.exports.fetcher_loadPixabyImageUrl = loadPixabyImageUrl;
