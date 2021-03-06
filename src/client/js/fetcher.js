let geonamesApiKey;
let weatherbitApiKey;
let pixabayApiKey;

//public functions here

const loadApiKeys = async () => {
    const promisedKeys = ['geonames', 'weatherbit', 'pixabay'].map(async serviceId =>
        fetch('http://localhost:8081/loadApiKey?application=' + serviceId)
            .then(response => response.text())
    );
    [geonamesApiKey, weatherbitApiKey, pixabayApiKey] = await Promise.all(promisedKeys);
}

const loadGeoInformation = async city => {
    const url = createGeoInformationRequestAddress(city);
    const result = await fetch(url).then(response => response.json());
    return extractLocationProperties(result.postalCodes, city);
}

const loadWeatherForecast = async (lat, lng) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherbitApiKey}&lat=${lat}&lon=${lng}`;
    const weatherbitForecast = await fetch(url).then(response => response.json());
    return extractWeatherForecast(weatherbitForecast);
}

const loadCountryInformation = async (countryCode) => {
    const url = `https://restcountries.eu/rest/v2/alpha/${countryCode}?fields=name;subregion;currencies;flag`;
    return await fetch(url).then(response => response.json());
}

const loadPixabayImageUrl = async (searchStrings) => {
    if (searchStrings.length === 0) {
        return 'NO_IMAGE';
    }
    const url = createPixabayRequestAddress(searchStrings.shift());
    let response = await fetch(url).then(response => response.json());
    if (response.totalHits !== 0) {
        return response.hits[Math.floor(Math.random() * response.hits.length)].webformatURL;
    } else {
        return loadPixabayImageUrl(searchStrings);
    }
}

//private functions below here
const extractWeatherForecast = weatherbitForecast => {
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
};

const extractLocationProperties = (postalCodes, cityName) => {
    if (postalCodes.length === 0) {
        throw `Could not find a city with the name '${cityName}'`;
    }
    if (postalCodes[0].placeName === 'APO AA') {//Sometimes Geonames sends weird results
        console.log('Shift!');
        postalCodes.shift();
        return extractLocationProperties(postalCodes, cityName);
    }
    return {
        location: postalCodes[0].placeName,
        region: postalCodes[0].adminName1,
        country: postalCodes[0].countryCode,
        lng: postalCodes[0].lng,
        lat: postalCodes[0].lat
    };
};

const createPixabayRequestAddress = name => {
    const parameters = [
        `key=${pixabayApiKey}`,
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
};

const createGeoInformationRequestAddress = city => {
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
};


// exports
module.exports.fetcher_loadApiKeys = loadApiKeys;
module.exports.fetcher_loadGeoInformation = loadGeoInformation;
module.exports.fetcher_loadWeatherForecast = loadWeatherForecast;
module.exports.fetcher_loadPixabayImageUrl = loadPixabayImageUrl;
module.exports.fetcher_loadCountryInformation = loadCountryInformation;

