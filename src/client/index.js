import './styles/style.scss';
import app from './js/app'
const BUTTON_ID = 'generate';

document.addEventListener('DOMContentLoaded', async function () {
    console.log('page load complete');
    await app.loadApplicationKey();

});

document.getElementById(BUTTON_ID).addEventListener('click', app.generateEntry);