import {app} from './js/app';
import './styles/style.scss';

document.addEventListener('DOMContentLoaded', async function () {
    await app.loadOWMApiKey();
});

document.getElementById(BUTTON_ID).addEventListener('click', app.generateEntry);