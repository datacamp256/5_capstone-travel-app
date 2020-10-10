import './styles/style.scss';
import {generateEntry} from './js/app'
import {countdown_initCountDown} from './js/countdown';
import {
    dom_displayError,
    dom_displayLocationImage,
    dom_displayWeather,
    dom_hideError,
    dom_setCountdown,
    dom_updateResult
} from './js/domUpdater'
import {
    fetcher_loadApiKeys,
    fetcher_loadGeoInformation,
    fetcher_loadPixabayImageUrl,
    fetcher_loadWeatherForecast,
    fetcher_loadCountryInformation
} from './js/fetcher'

const BUTTON_ID = 'generate';

document.addEventListener('DOMContentLoaded', async function () {
    await fetcher_loadApiKeys();
});

document.getElementById(BUTTON_ID).addEventListener('click', event => generateEntry(event));

export {
    countdown_initCountDown,
    fetcher_loadGeoInformation,
    fetcher_loadWeatherForecast,
    fetcher_loadPixabayImageUrl,
    fetcher_loadCountryInformation,
    dom_setCountdown,
    dom_displayError,
    dom_hideError,
    dom_displayWeather,
    dom_displayLocationImage,
    dom_updateResult
}