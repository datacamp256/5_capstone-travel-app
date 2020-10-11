import {afterAll, beforeEach, describe, jest, test} from '@jest/globals';
import sut from '../server'
import {instance, mock, verify, when} from "ts-mockito";

describe('the server ', () => {

    const originalEnvironment = process.env;

    beforeEach(() => {
        jest.resetModules()
        process.env = {...originalEnvironment};
    });

    afterAll(() => {
        process.env = originalEnvironment;
    });

    test('should return a pixabay api key', () => {
        process.env.PIXABAY_APIKEY = '::api-key::'
        const reqMock = mock();
        const resMock = mock();
        const queryMock = mock()
        when(reqMock.query).thenReturn(instance(queryMock));
        when(queryMock.application).thenReturn('pixabay');

        sut.loadApiKey(instance(reqMock), instance(resMock));

        verify(resMock.send('::api-key::')).once();
    });
});