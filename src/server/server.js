const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
app.use(express.static('dist'))

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8081;

// Setup Server
app.listen(port, listening);

//endpoint for api-key
app.get('/loadApiKey/:application?', loadApiKey);

function loadApiKey(request, response) {
    response.type('text/plain')
    const requestedApplication = request.query.application;
    if (!requestedApplication) {
        console.log('parameter "application" not given');
        response.status(400).send('URL-Parameter "application" is not specified.');
        return;
    }
    switch (requestedApplication.toLowerCase()) {
        case 'geonames':
            response.send(process.env.GEONAMES_USERNAME);
            break;
        case 'weatherbit':
            response.send(process.env.WEATHERBIT_APIKEY);
            break;
        case 'pixabay':
            response.send(process.env.PIXABAY_APIKEY);
            break;
        default:
            console.warn(`The application "${requestedApplication}" is not known.`);
            response.status(400).send(`The application "${requestedApplication}" is not known.`);
    }
}

// Callback to debug
function listening() {
    ['GEONAMES_USERNAME', 'WEATHERBIT_APIKEY', 'PIXABAY_APIKEY'].forEach(variable => {
        if (!Object.prototype.hasOwnProperty.call(process.env, variable)) {
            console.error(`ERROR: Environment variable ${variable} is missing.`);
            process.exit(1);
        }
    });
}

module.exports.loadApiKey = loadApiKey;