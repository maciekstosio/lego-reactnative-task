import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react-native'
import AppContainer from '@/AppContainer'
import getMinifigsResponse from '@/utils/test/__mocks__/getMinifigsResponse.json'

jest.useFakeTimers()

const fetchMock = require('fetch-mock-jest')

describe('web view integration test', () => {
    beforeEach(() => {
        fetchMock.getOnce(/api\/v3\/lego\/minifigs/, getMinifigsResponse)
    })

    afterEach(() => {
        fetchMock.mockReset()
    })
    
    it('renders random screen as default ', async () => {
        render(
            <AppContainer />
        )
        
        expect(screen.getByText('Loading...')).toBeOnTheScreen()

        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        fireEvent(screen.getByTestId('button.showDetails.fig-000471.label'), 'press')
        expect(screen.getByTestId('web-view')).toBeOnTheScreen()
    })
})