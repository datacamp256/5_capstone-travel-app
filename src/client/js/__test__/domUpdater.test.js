import {beforeEach, describe, expect, test} from '@jest/globals';
import {anyString, instance, mock, reset, verify, when} from "ts-mockito";
// import 'babel-polyfill';

const rewire = require('rewire');

const sut = rewire('../domUpdater.js');


describe('domUpdater.js ', () => {
    const documentMock = mock();
    const clientMock = mock();

    beforeEach(() => reset(clientMock, documentMock));
    sut.__set__('Client', instance(clientMock));
    sut.__set__('document', instance(documentMock));

    describe('updateResult', () => {
        const updateResult = sut.__get__('updateResult');
        sut.__set__('listCurrencies', () => '::currency::');

        test('should show a result', () => {
            const cityText = '::city::';
            const city = document.createElement('div');
            const dateText = '::date::';
            const date = document.createElement('div');
            const currencyContainer = {name: '::country::', subregion: '::subregion::', currencies: []};
            const currency = document.createElement('div');
            const result = document.createElement('div');
            result.style.display = 'wrong';

            when(documentMock.getElementById('city')).thenReturn(city);
            when(documentMock.getElementById('date')).thenReturn(date);
            when(documentMock.getElementById('currency')).thenReturn(currency);
            when(documentMock.getElementById('result')).thenReturn(result);

            updateResult(true, cityText, dateText, currencyContainer);

            expect(city.innerText).toEqual('::city::, ::country::');
            expect(date.innerText).toEqual(dateText);
            expect(currency.innerText).toEqual("You will travel to ::subregion::. Don't forget to have enough ::currency:: in your wallet!");
            expect(result.style.display).toEqual('block');
        });

        test('should hide a result', () => {
            const result = document.createElement('div');
            result.style.display = 'wrong';
            const currencyContainer = {name: '::country::', subregion: '::subregion::', currencies: []};
            when(documentMock.getElementById('result')).thenReturn(result);

            updateResult(false, '::any::', '::any::', currencyContainer);

            verify(documentMock.getElementById('city')).never();
            verify(documentMock.getElementById('date')).never();
            verify(documentMock.getElementById('currency')).never();
            expect(result.style.display).toEqual('none');
        });
    });


});