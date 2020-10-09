let geonamesApiKey;
let weatherbitApiKey;
//public functions here

async function loadGeonamesApiKey() {
    const promisedKeys = ['geonames', 'weatherbit'].map(async serviceId =>
        fetch('http://localhost:8081/loadApiKey?application=' + serviceId)
            .then(response => response.text())
    );
    [geonamesApiKey, weatherbitApiKey] = await Promise.all(promisedKeys);
}

async function loadGeoInformation(zipCode) {
    const url = createGeoInformationRequestAddress(zipCode);
    const result = await fetch(url).then(response => response.json());
    console.log(result);
    return extractLocationProperties(result);
}

async function loadWeatherForecast(lat, lng) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherbitApiKey}&lat=${lat}&lon=${lng}`;
    const result = await fetch(url).then(response => response.json());
    console.log(result);
    return result;
}

// private functions here

function extractLocationProperties(result) {
    return {
        location: result.postalCodes[0].placeName,
        lat: result.postalCodes[0].lat,
        lng: result.postalCodes[0].lng,
        region: result.postalCodes[0].adminName1,
        country: result.postalCodes[0].countryCode
    };
}

function createGeoInformationRequestAddress(zipCode) {
    const parameters = [
        `username=${geonamesApiKey}`,
        `placename=${encodeURIComponent(zipCode)}`,
        'maxRows=10',
        'style=MEDIUM',
        'countryBias=US',
        'countryBias=DE',
        'countryBias=IN',
    ];
    return 'http://api.geonames.org/postalCodeSearchJSON?' + parameters.join('&');
}

// exports
module.exports.backend_loadGeonamesApiKey = loadGeonamesApiKey;
module.exports.backend_loadGeoInformation = loadGeoInformation;
module.exports.fetcher_loadWeatherForecast = loadWeatherForecast;
