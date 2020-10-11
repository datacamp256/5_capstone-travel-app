import {beforeEach, describe, expect, test} from '@jest/globals';
import {capture, instance, mock, reset, when} from "ts-mockito";

const rewire = require('rewire');

const sut = rewire('../countdown.js');


describe('initCountDown in countdown.js ', () => {
    const initCountDown = sut.__get__('initCountDown');
    const documentMock = mock();
    const dateInput = document.createElement('input');
    const clientMock = mock();

    sut.__set__('document', instance(documentMock));
    sut.__set__('Client', instance(clientMock));

    beforeEach(() => reset(clientMock));

    test('should show days in the future', () => {
        dateInput.value = '4020-01-01';
        when(documentMock.getElementById('start-input')).thenReturn(dateInput);

        initCountDown();

        const newText = capture(clientMock.dom_setCountdown).last();
        expect(newText[0]).toMatch(/[0-9]+ days to go$/);
    });

    test('should show nothing in the past', () => {
        dateInput.value = '1900-01-01';
        when(documentMock.getElementById('start-input')).thenReturn(dateInput);

        initCountDown();

        const newText = capture(clientMock.dom_setCountdown).last();
        expect(newText[0]).toEqual('');
    });
});