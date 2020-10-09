import './styles/style.scss';
import {generateEntry} from './js/app'
import {countdown_initCountDown} from './js/countdown';
import {dom_displayError, dom_hideError, dom_setCountdown} from './js/domUpdater'
import {backend_getGeonamesApiKey, backend_loadGeonamesApiKey} from './js/apiKeys'

const BUTTON_ID = 'generate';

document.addEventListener('DOMContentLoaded', async function () {
    backend_loadGeonamesApiKey();
});

document.getElementById(BUTTON_ID).addEventListener('click', event => generateEntry(event));

export {countdown_initCountDown, backend_getGeonamesApiKey, dom_setCountdown, dom_displayError, dom_hideError}