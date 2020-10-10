# TODO
Beginning stuff

## Extensions
You have suggested some really useful improvements. As I was beginning to run out of time I had to choose some low hanging fruits.

###Pull in an image for the country from Pixabay API when the entered location brings up no results
That was quite fun. However, I could not find any real locations which could be found in geonames but not in pixabay. Though, when I manually tamper with the city name I could prove the functionality does work.

You can find the implementation in `fetcher.loadPixabayImageUrl(searchStrings)` .

###Incorporate icons into forecast.
The weatherbit api seemed to FORCE you to use their icons by giving the icon-id in the API-response. That was a low hanging fruit.

###Integrate the REST Countries API to pull in data for the country being visited.
Why don't we just add some information about the country to let you plan your travel right easier?

You see
* the national flag
* some hints about the currency
* the subregion
