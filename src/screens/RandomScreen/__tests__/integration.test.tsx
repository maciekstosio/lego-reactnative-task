import {act, fireEvent, render, screen, userEvent, waitFor, waitForElementToBeRemoved, within} from '@testing-library/react-native'
import AppContainer from '@/AppContainer'
import getMinifigsResponse from '@/utils/test/__mocks__/getMinifigsResponse.json'
import getMinifigsEmptyResponse from '@/utils/test/__mocks__/getMinifigsEmptyResponse.json'

jest.useFakeTimers()

const fetchMock = require('fetch-mock-jest')

describe('random screen integration test', () => {
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

        expect(screen.getByText('CHOOSE YOUR MINIFIG')).toBeOnTheScreen()
    })

    it('loads carusel succesfully ', async () => {
        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
    })

    it('has select button disabled by default', async () => {
        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        

        expect(screen.getByTestId('button.chooseFigure')).toBeOnTheScreen()
        expect(screen.getByTestId('button.chooseFigure').props.accessibilityState.disabled).toBeTruthy()
    })

    it('displays 5 minifigs', async () => {
        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        const minigis = screen.getAllByTestId(/minifig/)

        expect(minigis.length).toBe(5)
    })

    it('displays cards with minifigs correctly', async () => {
        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));

        getMinifigsResponse.results.forEach(result => {
            const cardForMinifig = within(screen.getByTestId(`card.${result.set_num}`));

            expect(cardForMinifig.getByText(result.name.split(',')[0])).toBeOnTheScreen()
            expect(cardForMinifig.getByText('Show details')).toBeOnTheScreen()
            expect(cardForMinifig.getByText('Show details')).toBeOnTheScreen()
            expect(cardForMinifig.getByTestId(`button.showDetails.${result.set_num}`)).toBeOnTheScreen()

            if (result.set_img_url) {
                expect(cardForMinifig.getByTestId(`image.${result.set_img_url}`)).toBeOnTheScreen()
            } else {
                expect(cardForMinifig.getByTestId('icon.camera')).toBeOnTheScreen()
            }
        })
    })

    it('displays ImagePlaceholder when url is missing', async () => {
        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        const cardWithMissingImage = within(screen.getByTestId('card.fig-000457'));
        expect(cardWithMissingImage.getByTestId('icon.camera')).toBeOnTheScreen();
    })

    it('enables the button when minifig is select', async () => {
        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        fireEvent(screen.getByText('Hermione Granger'), 'press')
        expect(screen.getByTestId('button.chooseFigure').props.accessibilityState.disabled).toBeFalsy()
        expect(screen.getByTestId('card.fig-000593').props.accessibilityState.selected).toBeTruthy()
    })

    it('unselects the minifig when pressed second time ', async () => {
        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
        
        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        fireEvent(screen.getByText('Hermione Granger'), 'press')
        expect(screen.getByTestId('button.chooseFigure').props.accessibilityState.disabled).toBeFalsy()
        expect(screen.getByTestId('card.fig-000593').props.accessibilityState.selected).toBeTruthy()
        fireEvent(screen.getByText('Hermione Granger'), 'press')
        expect(screen.getByTestId('button.chooseFigure').props.accessibilityState.disabled).toBeTruthy()
        expect(screen.getByTestId('card.fig-000593').props.accessibilityState.selected).toBeFalsy()
    })

    it('allows to only one to be selected at a time ', async () => {
        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        fireEvent(screen.getByText('Hermione Granger'), 'press')
        expect(screen.getByTestId('button.chooseFigure').props.accessibilityState.disabled).toBeFalsy()
        expect(screen.getByTestId('card.fig-000593').props.accessibilityState.selected).toBeTruthy()
        
        const allCards = screen.getAllByTestId(/card/)
        
        expect(allCards.filter(card => card.props.accessibilityState.selected).length).toBe(1)
        
        fireEvent(screen.getByText('Ron Weasley'), 'press')
        expect(screen.getByTestId('button.chooseFigure').props.accessibilityState.disabled).toBeFalsy() // Button still enabled
        expect(screen.getByTestId('card.fig-000593').props.accessibilityState.selected).toBeFalsy() // Hermione unselected
        expect(screen.getByTestId('card.fig-000594').props.accessibilityState.selected).toBeTruthy() // Ron selected

        expect(allCards.filter(card => card.props.accessibilityState.selected).length).toBe(1)
    })

    it('shows an error screen when fetch fails', async () => {
        fetchMock.mockReset()
        fetchMock.getOnce(/api\/v3\/lego\/minifigs/, 500)

        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
        
        expect(screen.getByText('Unexpected error')).toBeOnTheScreen()
        expect(screen.getByText('Unexpected network error occured')).toBeOnTheScreen()
    })

    it('shows an error screen when fetched empty array', async () => {
        fetchMock.mockReset()
        fetchMock.getOnce(/api\/v3\/lego\/minifigs/, getMinifigsEmptyResponse)

        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
        
        expect(screen.getByText('Unexpected error')).toBeOnTheScreen()
        expect(screen.getByText('Unexpected server error occured')).toBeOnTheScreen()
    })

    it('moves do details screen after selecting figure and pressing choose', async () => {
        render(
            <AppContainer />
        )

        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        fireEvent(screen.getByText('Hermione Granger'), 'press')
        fireEvent(screen.getByText('Select'), 'press')

        expect(screen.getByText('PERSONAL DETAILS')).toBeOnTheScreen()
    })
})