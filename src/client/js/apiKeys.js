let geonamesApiKey;

async function loadGeonamesApiKey() {
   await fetch('http://localhost:8081/loadApiKey?application=geonames')
        .then(response => response.text())
        .then(text => geonamesApiKey = text);
}
const getGeonamesApiKey = () => geonamesApiKey;

module.exports.backend_loadGeonamesApiKey = loadGeonamesApiKey;
module.exports.backend_getGeonamesApiKey = getGeonamesApiKey;
