import './styles/style.scss';
// import './views/assets/images/material_io-explore_black_large.png';
import {generateEntry} from './js/app'
import {countdown_initCountDown} from './js/countdown';
import {dom_displayError, dom_hideError, dom_setCountdown, dom_displayWeather,dom_displayLocationImage} from './js/domUpdater'
import { fetcher_loadGeoInformation, fetcher_loadApiKeys, fetcher_loadWeatherForecast, fetcher_loadPixabyImageUrl} from './js/fetcher'

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
    dom_displayLocationImage
}