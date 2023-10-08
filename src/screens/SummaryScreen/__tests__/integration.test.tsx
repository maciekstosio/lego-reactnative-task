import {act, fireEvent, render, screen, userEvent, waitFor, waitForElementToBeRemoved} from '@testing-library/react-native'
import AppContainer from '@/AppContainer'
import getMinifigsResponse from '@/utils/test/__mocks__/getMinifigsResponse.json'
import getPartForMinifig from '@/utils/test/__mocks__/getPartForMinifig.json'

jest.useFakeTimers()

const fetchMock = require('fetch-mock-jest')

describe('personal details screen integration test', () => {
    const goToSummaryScreen = async () => {
        const user = userEvent.setup(); 
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        fireEvent(screen.getByText(/Hermione Granger/), 'press')
        fireEvent(screen.getByText('Select'), 'press')
        
        await act(async () => {
            await user.type(screen.getByTestId('text-input.fullName'), 'Joe Doe')
            await user.type(screen.getByTestId('text-input.email'), 'maciek@test.pl')
            await user.type(screen.getByTestId('text-input.adress'), 'Testowa 1')
            await user.type(screen.getByTestId('text-input.city'), 'Wrocław')
            await user.type(screen.getByTestId('text-input.state'), 'Polska')
            await user.type(screen.getByTestId('text-input.zipcode'), '00-000')
            
            await user.press(screen.getByText('View summary'))
        })
    }

    beforeEach(() => {
        fetchMock.getOnce(/api\/v3\/lego\/minifigs/, getMinifigsResponse)
    })
    
    afterEach(() => {
        fetchMock.mockReset()
    })
    
    it('displays loading', async () => {
        fetchMock.getOnce(/api\/v3\/lego\/minifigs\/.*\/parts/, getPartForMinifig, {delay: 200})

        render(
            <AppContainer />
        )

        await goToSummaryScreen()

        expect(screen.getByText('Loading...')).toBeOnTheScreen()
    })

    it('displays summary', async () => {
        fetchMock.getOnce(/api\/v3\/lego\/minifigs\/.*\/parts/, getPartForMinifig)

        render(
            <AppContainer />
        )
        
        await goToSummaryScreen()

        expect(screen.getByText('SUMMARY')).toBeOnTheScreen()

        expect(screen.getByText('Hermione Granger')).toBeOnTheScreen()
        expect(screen.getByTestId('minifig.fig-000593')).toBeOnTheScreen()

        getPartForMinifig.results.forEach(result => {
            expect(screen.getByText(result.part.name.split(',')[0])).toBeOnTheScreen()
            expect(screen.getByText(result.part.part_num)).toBeOnTheScreen()
        })

        expect(screen.getByText('Submit')).toBeOnTheScreen()
    })

    it('displays error when parts fetch fails', async () => {
        fetchMock.getOnce(/api\/v3\/lego\/minifigs\/.*\/parts/, 500)

        render(
            <AppContainer />
        )
        
        await goToSummaryScreen()

        expect(screen.getByText('Unexpected error')).toBeOnTheScreen()
        expect(screen.getByText('Unexpected network error occured')).toBeOnTheScreen()
        expect(screen.getByText('Try again')).toBeOnTheScreen()
    })
})