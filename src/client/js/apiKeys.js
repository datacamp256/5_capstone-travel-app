let geonamesApiKey;

async function loadGeonamesApiKey() {
   await fetch('http://localhost:8081/loadApiKey?application=geonames')
        .then(response => response.text())
        .then(text => geonamesApiKey = text);
    console.log(geonamesApiKey);
}
const getGeonamesApiKey = () => geonamesApiKey;

module.exports.loadGeonamesApiKey = loadGeonamesApiKey;
module.exports.getGeonamesApiKey = getGeonamesApiKey;
