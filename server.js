// Setup empty JS object to act as endpoint for all routes
projectData = {entries: []};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

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

const port = 8080;

// Setup Server
const server = app.listen(port, listening);

//endpoint for api-key
app.get('/openWeatherMapApiKey', getOpenWeatherMapApiKey);
function getOpenWeatherMapApiKey(request, response) {
    console.log('Client requested OpenWeatherMap.org API key');
    response.type('application/json')
    response.send(process.env.OPENWEATHER_APIKEY);
}

// Callback to debug
function listening() {
    console.log(`Server running on port ${port}`);
}

// Initialize all route with a callback function
app.get('/all', receiveAllProjectData);
app.get('/entries', receiveAllProjectData);
app.get('/entries/:id', function (request, response) {
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
    console.log(`Received Post Request for ${request.body.temperature}`);
    if (!(request.body.hasOwnProperty('temperature') &&
        request.body.hasOwnProperty('date') &&
        request.body.hasOwnProperty('comment'))) {
        console.log(`Bad Request: ${JSON.stringify(request.body)}`)
        response.status(400).send('Request must contain json-object containing the keys "temperature", "date" and "comment".')
    } else {
        const index = projectData.entries.push(request.body);
        response.status(201).send(`/entries/${index}`);
    }
}