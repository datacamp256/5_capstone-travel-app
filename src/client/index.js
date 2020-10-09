import './styles/style.scss';
import {generateEntry} from './js/app'
import {api_geonamesApiKey, backend_getGeonamesApiKey, backend_loadGeonamesApiKey} from './js/apiKeys'
import {countdown_initCountDown} from './js/countdown';
import {dom_setCountdown} from './js/domUpdater'

const BUTTON_ID = 'generate';

document.addEventListener('DOMContentLoaded', async function () {
    backend_loadGeonamesApiKey();
});

document.getElementById(BUTTON_ID).addEventListener('click', event => generateEntry(event));

export {api_geonamesApiKey, countdown_initCountDown, backend_getGeonamesApiKey, dom_setCountdown}