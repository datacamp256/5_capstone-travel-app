import {beforeEach, describe, expect, test} from '@jest/globals';
import {instance, mock, reset, verify, when} from "ts-mockito";
import 'babel-polyfill';

const rewire = require('rewire');

const sut = rewire('../app.js');


describe('app.js ', () => {
    const documentMock = mock();
    const clientMock = mock();

    beforeEach(() => reset(clientMock, documentMock));
    sut.__set__('Client', instance(clientMock));
    sut.__set__('document', instance(documentMock));

    describe('getWeatherOfTheDay', () => {
        const getWeatherOfTheDay = sut.__get__('getWeatherOfTheDay');

        test('should set the weather of the day', async () => {
            const dateInput = document.createElement('input');
            dateInput.value = '::selected-date::';
            const allWeather = {
                days: [{valid_date: '::wrong-date::', correct: false},
                    {valid_date: '::selected-date::', correct: true},
                    {valid_date: '::also-wrong-date::', correct: false}]
            }
            const locationProperties = {lat: '::lat::', lng: '::lng::'}
            when(clientMock.fetcher_loadWeatherForecast('::lat::', '::lng::')).thenReturn(allWeather);
            when(documentMock.getElementById('start-input')).thenReturn(dateInput);

            const result = await getWeatherOfTheDay(locationProperties);

            expect(result.correct).toBeTruthy();
            verify(clientMock.fetcher_loadWeatherForecast('::lat::', '::lng::')).once();
            verify(documentMock.getElementById('start-input')).thrice();
        });
    });


});