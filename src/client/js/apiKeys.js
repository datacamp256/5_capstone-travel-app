let geonamesApiKey;

function loadGeonamesApiKey() {
    geonamesApiKey = fetch('http://localhost:8081/loadApiKey?application=geonames')
        .then(function (response) {
            return response.text();
        });
}

module.exports.loadGeonamesApiKey = loadGeonamesApiKey;
module.exports.geonamesApiKey = geonamesApiKey;
