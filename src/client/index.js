import './styles/style.scss';
import {generateEntry} from './js/app'
import {geonamesApiKey, getGeonamesApiKey,loadGeonamesApiKey} from './js/apiKeys'
import {initCountDown} from './js/countdown';

const BUTTON_ID = 'generate';

document.addEventListener('DOMContentLoaded', async function () {
    loadGeonamesApiKey();
});

document.getElementById(BUTTON_ID).addEventListener('click', event => generateEntry(event));

export {geonamesApiKey, initCountDown,getGeonamesApiKey}