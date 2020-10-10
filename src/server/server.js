const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
const projectData = {entries: []};

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
app.get('/loadApiKey/:application?', (request, response) => {
    response.type('text/plain')
    if (!request.query.application) {
        console.log('parameter "application" not given');
        response.status(400).send('URL-Parameter "application" is not specified.');
        return;
    }
    switch (request.query.application.toLowerCase()) {
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
            console.warn(`The application "${request.query.application}" is not known.`);
            response.status(400).send(`The application "${request.query.application}" is not known.`);
    }
});

// Callback to debug
function listening() {
    ['GEONAMES_USERNAME', 'WEATHERBIT_APIKEY', 'PIXABAY_APIKEY'].forEach(variable => {
        if (!Object.prototype.hasOwnProperty.call(process.env, variable)) {
            console.error(`ERROR: Environment variable ${variable} is missing.`);
            process.exit(1);
        }
    });
    console.log(`Server running on port ${port}`);
}

// Initialize all route with a callback function
app.get('/all', receiveAllProjectData);
app.get('/entries', receiveAllProjectData);
app.get('/entries/:id', (request, response) => {
    console.log("Client requested entry no. " + request.params.id);
    const entry = projectData.entries[request.params.id]
    if (!entry) {
        console.log(`Requested entry ${request.params.id} does not exist`);
        response.status(404).send('Requested entry does not exist');
    } else {
        console.log(`Returning entry ${request.params.id}`);
        response.send(entry);

    }
});


// Callback function to complete GET '/all'
function receiveAllProjectData(request, response) {
    console.log('Client requested for all project data');
    response.send(projectData);
}

// Post Route
app.post('/entries', addEntry);

// Callback function to post an entry

function addEntry(request, response) {
    console.log(`Received Post Request ${JSON.stringify(request.body)}`);
    if (!(Object.prototype.hasOwnProperty.call(request.body,'temperature') &&
        Object.prototype.hasOwnProperty.call(request.body,'date') &&
        Object.prototype.hasOwnProperty.call(request.body,'comment'))) {
        console.log(`Bad Request: ${JSON.stringify(request.body)}`)
        response.status(400).send('Request must contain json-object containing the keys "temperature", "date" and "comment".')
    } else {
        const index = projectData.entries.push(request.body);
        response.status(201).send(`/entries/${index}`);
    }
}