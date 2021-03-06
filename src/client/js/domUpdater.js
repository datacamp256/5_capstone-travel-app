//public functions here

const setCountdown = newText => {
    document.getElementById('countdown').innerText = newText;
}

function displayError(error) {
    const resultBox = document.getElementById('result');
    resultBox.style.display='none';
    const errorLabel = document.getElementById('error-label');
    errorLabel.innerText = error;
    errorLabel.style.display = 'block';
    console.error(error);
}

const updateResult = (visible, city, date, countryInformation) => {
    if (visible) {
        document.getElementById('city').innerText = `${city}, ${countryInformation.name}`;
        document.getElementById('date').innerText = date;
        document.getElementById('currency').innerText = `You will travel to ${countryInformation.subregion}. Don't forget to have enough ${listCurrencies(countryInformation.currencies)} in your wallet!`;
    }
    document.getElementById('result').style.display = visible ? 'block' : 'none';
}

const hideError = () => {
    document.getElementById('error-label').style.display = 'none';
}

const displayWeather = weather => {
    const div = document.getElementById('weather-box');
    div.style.display = 'none';
    if (weather) {
        let image = document.getElementById('weather-icon');
        image.src = `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`;
        image.alt = weather.description;
        document.getElementById('weather-description').innerText = weather.description;
        document.getElementById('temperature').innerText = weather.temp + ' °C';
        document.getElementById('pop').innerText = weather.probability_of_precipitation + ' %';
        div.style.display = 'grid';
    } //if no weather is available we keep the box invisible
}

const displayLocationImage = imageUrl => {
    let div = document.getElementById('picture-with-watermark');
    let img = document.getElementById('picture');
    if (imageUrl === 'NO_IMAGE') {
        div.style.display = 'none';
    } else {
        img.src = imageUrl;
        div.style.display = 'block';
    }
}

const getCityName = () => {
    return document.getElementById('city-input').value;
}

// private functions here

const listCurrencies = currencies => {
    const currenciesList = currencies.map(currency => `${currency.name}(${currency.symbol})`)
    return currenciesList.join(' or ');
}

// exports
module.exports.dom_setCountdown = setCountdown;
module.exports.dom_displayWeather = displayWeather;
module.exports.dom_displayError = displayError;
module.exports.dom_hideError = hideError;
module.exports.dom_displayLocationImage = displayLocationImage;
module.exports.dom_updateResult = updateResult;
module.exports.dom_getCityName = getCityName;
