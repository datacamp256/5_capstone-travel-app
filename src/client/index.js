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
    fetcher_loadPixabyImageUrl,
    fetcher_loadWeatherForecast
} from './js/fetcher'

const BUTTON_ID = 'generate';

document.addEventListener('DOMContentLoaded', async function () {
    fetcher_loadApiKeys();
});

document.getElementById(BUTTON_ID).addEventListener('click', event => generateEntry(event));

export {
    countdown_initCountDown,
    fetcher_loadGeoInformation,
    fetcher_loadWeatherForecast,
    fetcher_loadPixabyImageUrl,
    dom_setCountdown,
    dom_displayError,
    dom_hideError,
    dom_displayWeather,
    dom_displayLocationImage,
    dom_updateResult
}