let geonamesApiKey;
//public functions here

async function loadGeonamesApiKey() {
   await fetch('http://localhost:8081/loadApiKey?application=geonames')
        .then(response => response.text())
        .then(text => geonamesApiKey = text);
}
const getGeonamesApiKey = () => geonamesApiKey;


async function loadGeoInformation(zipCode) {
   let key =  Client.backend_getGeonamesApiKey();
   const parameters = [
       `username=${key}`,
      `placename=${encodeURIComponent(zipCode)}`,
       'maxRows=10',
       'style=MEDIUM',
       'countryBias=US',
       'countryBias=DE',
       'countryBias=IN',
   ];
   let url ='http://api.geonames.org/postalCodeSearchJSON?'+parameters.join('&');
   console.log(url);
   let result = await fetch(url)
       .then(response => response.json());
   let newVar = {
      location: result.postalCodes[0].placeName,
      lat: result.postalCodes[0].lat,
      lng: result.postalCodes[0].lng,
      region: result.postalCodes[0].adminName1,
      country: result.postalCodes[0].countryCode
   };
   console.log(newVar);
   return newVar;
}

// private functions here

// exports
module.exports.backend_loadGeonamesApiKey = loadGeonamesApiKey;
module.exports.backend_getGeonamesApiKey = getGeonamesApiKey;
module.exports.backend_loadGeoInformation = loadGeoInformation;
