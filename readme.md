# About this Project
This travel app is the capstone project of the udacity course for frontend developers.
## How to prepare the project
In order to get the project running, you have to do the actions in the sections below.
### Check out the project from github: 
The repository can be found at  [https://github.com/datacamp256/5_capstone-travel-app](https://github.com/datacamp256/5_capstone-travel-app). You can clone it for example using the gh command:

```bash
  gh repo clone datacamp256/5_capstone-travel-app
```
 
### Get the necessary API Keys
You need API keys from
* [Geonames](http://www.geonames.org/login)
* [Weatherbit](https://www.weatherbit.io/account/create)
* [Pixabay](https://pixabay.com/api/docs/)


### Set the API Key as environment variables
Create a file '.env' in the root directory of the project (next to this README.md file) and store the received API-Key as value behind `GEONAMES_USERNAME=`, `WEATHERBIT_APIKEY=` and `PIXABAY_APIKEY=`
```bash
  touch .env
  echo "GEONAMES_USERNAME=<your key>" > .env
  echo "WEATHERBIT_APIKEY=<your key>" >> .env
  echo "PIXABAY_APIKEY=<your key>" >> .env
```

### Install dependencies
 Once you have installed [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) you have to download the dependencies using
```bash
 npm install
```

## Run the Application
To get the application online you have to make the packages to be distributed and run them.
### For Production
If you want the application just to run smooth, first create the build packages for 'prod' and then start the application:
```bash
npm run build-prod
npm start
```

### As development instance
If you want to make changes to the application it is more convenient to have the 'dev' environment created and run:
```bash
npm run build-dev
npm start
```

#### Development with live changing application
As a shortcut you can have the application deployed right from the sources (more or less). Your benefit is that each code change is visible in the browser after saving your files. On the other hand you cannot see the prepared artifacts in your dist directory.
```bash
npm run refresh-server
npm run run-dev
```
If you want to see changes in the server you have to rerun the refresh-server:
```bash
npm run refresh-server
```

## Extensions
You have suggested some really useful improvements. I implemented three of the listed ones.

###Pull in an image for the country from Pixabay API when the entered location brings up no results
That was quite fun. However, I could not find any real locations which could be found in geonames but not in pixabay. Though, when I manually tamper with the city name I could prove the functionality does work.

You can find the implementation in `fetcher.loadPixabayImageUrl(searchStrings)` .

###Incorporate icons into forecast.
The weatherbit api seemed to FORCE you to use their icons by giving the icon-id in the API-response. That was a low hanging fruit I implemented before knowing about it to be an extension.

###Integrate the REST Countries API to pull in data for the country being visited.
Why don't we just add some information about the country to let you plan your travel right easier?

You see
* the national flag
* some hints about the currency
* the subregion
