//public functions here

function setCountdown(newText) {
    document.getElementById('countdown').innerText = newText;
}

function displayError(error) {
    const errorLabel = document.getElementById('error-label');
    errorLabel.innerText = error;
    errorLabel.style.display = 'block';
    console.error(error);
}

function hideError() {
    document.getElementById('error-label').style.display = 'none';
}

function displayWeather(weather) {
    const div = document.getElementById('weather-box');
    div.style.display = 'none';
    if (weather) {
        let image = document.getElementById('weather-icon');
        image.src = `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`;
        image.alt = weather.description;
        document.getElementById('weather-description').innerText = weather.description;
        document.getElementById('temperature').innerText = weather.temp + ' °C';
        document.getElementById('pop').innerText = weather.probability_of_precipitation + ' %';
        div.style.display = 'block';
    } // else{// no weather available - keep box invisible}
}

function dom_displayLocationImage(imageUrl) {
    let div = document.getElementById('picture-with-watermark');
    let img = document.getElementById('picture');
    if (imageUrl === 'NO_IMAGE') {
        div.style.display = 'none';
    } else {
        img.src = imageUrl;
        div.style.display = 'block';
    }
}

// private functions here

// exports
module.exports.dom_setCountdown = setCountdown;
module.exports.dom_displayWeather = displayWeather;
module.exports.dom_displayError = displayError;
module.exports.dom_hideError = hideError;
module.exports.dom_displayLocationImage = dom_displayLocationImage;
