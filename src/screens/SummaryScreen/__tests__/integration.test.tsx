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
        expect(screen.getByText('Unexpected network error occured when fetching parts')).toBeOnTheScreen()
        expect(screen.getByText('Try again')).toBeOnTheScreen()
    })
    
    it('shows loading when form is submitting and ', async () => {
        const user = userEvent.setup()
        fetchMock.getOnce(/api\/v3\/lego\/minifigs\/.*\/parts/, getPartForMinifig)
        fetchMock.postOnce('http://localhost/placeOrder', 200, {delay: 200})
        
        render(
            <AppContainer />
        )
        
        await goToSummaryScreen()

        await user.press(screen.getByText('Submit'))

        expect(screen.getByText('Loading...')).toBeOnTheScreen()

        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        expect(screen.getByText('CHOOSE YOUR MINIFIG')).toBeOnTheScreen()
    })

    // Skipped as in requirement we should go to main screen anyway, should change in summary onSettled to onSuccess
    it.skip('shows error when form submitting failed', async () => {
        const user = userEvent.setup()
        fetchMock.getOnce(/api\/v3\/lego\/minifigs\/.*\/parts/, getPartForMinifig)
        fetchMock.postOnce('http://localhost/placeOrder', 500)
        
        render(
            <AppContainer />
        )
        
        await goToSummaryScreen()

        await user.press(screen.getByText('Submit'))

        expect(screen.getByText('Error while placing an order, try again')).toBeOnTheScreen()
    })

    it('redirects to first page when submitting succeeded', async () => {
        const user = userEvent.setup()
        fetchMock.getOnce(/api\/v3\/lego\/minifigs\/.*\/parts/, getPartForMinifig)
        fetchMock.postOnce('http://localhost/placeOrder', 200)
        
        render(
            <AppContainer />
        )
        
        await goToSummaryScreen()

        await user.press(screen.getByText('Submit'))

        expect(screen.getByText('CHOOSE YOUR MINIFIG')).toBeOnTheScreen()
    })
})