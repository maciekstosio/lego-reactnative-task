import {act, fireEvent, render, screen, userEvent, waitFor, waitForElementToBeRemoved} from '@testing-library/react-native'
import AppContainer from '../AppContainer'
import getMinifigsResponse from './__mocks__/getMinifigsResponse.json'
import getMinifigsEmptyResponse from './__mocks__/getMinifigsEmptyResponse.json'

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

    it('enables the button when minifig is select', async () => {
        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        fireEvent(screen.getByText(/Hermione Granger/), 'press')
        expect(screen.getByTestId('button.chooseFigure').props.accessibilityState.disabled).toBeFalsy()
        expect(screen.getByTestId('card.fig-000593').props.accessibilityState.selected).toBeTruthy()
    })

    it('unselects the minifig when pressed second time ', async () => {
        render(
            <AppContainer />
            )
            
            await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
            
            await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        fireEvent(screen.getByText(/Hermione Granger/), 'press')
        expect(screen.getByTestId('button.chooseFigure').props.accessibilityState.disabled).toBeFalsy()
        expect(screen.getByTestId('card.fig-000593').props.accessibilityState.selected).toBeTruthy()
        fireEvent(screen.getByText(/Hermione Granger/), 'press')
        expect(screen.getByTestId('button.chooseFigure').props.accessibilityState.disabled).toBeTruthy()
        expect(screen.getByTestId('card.fig-000593').props.accessibilityState.selected).toBeFalsy()
    })

    it('allows to only one to be selected at a time ', async () => {
        render(
            <AppContainer />
        )
        
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        fireEvent(screen.getByText(/Hermione Granger/), 'press')
        expect(screen.getByTestId('button.chooseFigure').props.accessibilityState.disabled).toBeFalsy()
        expect(screen.getByTestId('card.fig-000593').props.accessibilityState.selected).toBeTruthy()
        
        const allCards = screen.getAllByTestId(/card/)
        
        expect(allCards.filter(card => card.props.accessibilityState.selected).length).toBe(1)
        
        fireEvent(screen.getByText(/Harry Potter, Open Dark Blue Jacke/), 'press')
        expect(screen.getByTestId('button.chooseFigure').props.accessibilityState.disabled).toBeFalsy() // Button still enabled
        expect(screen.getByTestId('card.fig-000593').props.accessibilityState.selected).toBeFalsy() // Hermione unselected
        expect(screen.getByTestId('card.fig-000029').props.accessibilityState.selected).toBeTruthy() // Harry selected

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
        
        fireEvent(screen.getByText(/Hermione Granger/), 'press')
        fireEvent(screen.getByText('Select'), 'press')

        expect(screen.getByText('PERSONAL DETAILS')).toBeOnTheScreen()
    })
})

describe('details screen integration test', () => {
    const goGoDetailsScreen = async () => {
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        fireEvent(screen.getByText(/Hermione Granger/), 'press')
        fireEvent(screen.getByText('Select'), 'press')
    }

    beforeEach(() => {
        fetchMock.getOnce(/api\/v3\/lego\/minifigs/, getMinifigsResponse)
    })

    afterEach(() => {
        fetchMock.mockReset()
    })
    
    it('displays empty form', async () => {
        render(
            <AppContainer />
        )
        
        await goGoDetailsScreen()

        expect(screen.getByText('PERSONAL DETAILS')).toBeOnTheScreen()

        // All inputs on screen
        expect(screen.getByText('Full name')).toBeOnTheScreen()
        expect(screen.getByText('Email')).toBeOnTheScreen()
        expect(screen.getByText('Adress')).toBeOnTheScreen()
        expect(screen.getByText('City')).toBeOnTheScreen()
        expect(screen.getByText('State')).toBeOnTheScreen()
        expect(screen.getByText('Zip code')).toBeOnTheScreen()

        //All inputs empty
        expect(screen.getByTestId('text-input.fullName').props.value).toBe('')
        expect(screen.getByTestId('text-input.email').props.value).toBe('')
        expect(screen.getByTestId('text-input.adress').props.value).toBe('')
        expect(screen.getByTestId('text-input.city').props.value).toBe('')
        expect(screen.getByTestId('text-input.state').props.value).toBe('')
        expect(screen.getByTestId('text-input.zipcode').props.value).toBe('')

        expect(screen.getByTestId('button.viewSummary').props.accessibilityState.disabled).toBeTruthy()
    })

    it('shows error when fullName it too short', async () => {
        const user = userEvent.setup();

        render(
            <AppContainer />
        )
        
        await goGoDetailsScreen()
        
        await act(async () => {
            await user.type(screen.getByTestId('text-input.fullName'), '')
        })

        expect(screen.getByText('must be at least 3 characters long')).toBeOnTheScreen()
        expect(screen.getByTestId('button.viewSummary').props.accessibilityState.disabled).toBeTruthy()
    })

    it('shows error when digit is used for fullName', async () => {
        const user = userEvent.setup();

        render(
            <AppContainer />
        )
        
        await goGoDetailsScreen()
        
        await act(async () => {
            await user.type(screen.getByTestId('text-input.fullName'), 'Ma1c')
        })

        expect(screen.getByText('should containt only latters and spaces')).toBeOnTheScreen()
        expect(screen.getByTestId('button.viewSummary').props.accessibilityState.disabled).toBeTruthy()
    })

    it('shows error when special chars are used for fullName', async () => {
        const user = userEvent.setup();

        render(
            <AppContainer />
        )
        
        await goGoDetailsScreen()
        
        await act(async () => {
            await user.type(screen.getByTestId('text-input.fullName'), 'Ma!c')
        })

        expect(screen.getByText('should containt only latters and spaces')).toBeOnTheScreen()
        expect(screen.getByTestId('button.viewSummary').props.accessibilityState.disabled).toBeTruthy()
    })

    it('shows error when email has wrong format', async () => {
        const user = userEvent.setup();

        render(
            <AppContainer />
        )
        
        await goGoDetailsScreen()
        
        await act(async () => {
            await user.type(screen.getByTestId('text-input.email'), 'email')
        })

        expect(screen.getByText('email must be a valid email')).toBeOnTheScreen()
        expect(screen.getByTestId('button.viewSummary').props.accessibilityState.disabled).toBeTruthy()
    })

    it('shows error when adress it too short', async () => {
        const user = userEvent.setup();

        render(
            <AppContainer />
        )
        
        await goGoDetailsScreen()
        
        await act(async () => {
            await user.type(screen.getByTestId('text-input.adress'), '')
        })

        expect(screen.getByText('must be at least 3 characters long')).toBeOnTheScreen()
        expect(screen.getByTestId('button.viewSummary').props.accessibilityState.disabled).toBeTruthy()
    })

    it('shows error when city it too short', async () => {
        const user = userEvent.setup();

        render(
            <AppContainer />
        )
        
        await goGoDetailsScreen()
        
        await act(async () => {
            await user.type(screen.getByTestId('text-input.city'), '')
        })

        expect(screen.getByText('must be at least 3 characters long')).toBeOnTheScreen()
        expect(screen.getByTestId('button.viewSummary').props.accessibilityState.disabled).toBeTruthy()
    })

    it('shows error when state it too short', async () => {
        const user = userEvent.setup();

        render(
            <AppContainer />
        )
        
        await goGoDetailsScreen()
        
        await act(async () => {
            await user.type(screen.getByTestId('text-input.state'), '')
        })

        expect(screen.getByText('must be at least 3 characters long')).toBeOnTheScreen()
        expect(screen.getByTestId('button.viewSummary').props.accessibilityState.disabled).toBeTruthy()
    })

    it('shows error when zipcode it too short', async () => {
        const user = userEvent.setup();

        render(
            <AppContainer />
        )
        
        await goGoDetailsScreen()
        
        await act(async () => {
            await user.type(screen.getByTestId('text-input.zipcode'), '')
        })

        expect(screen.getByText('must be at least 3 characters long')).toBeOnTheScreen()
        expect(screen.getByTestId('button.viewSummary').props.accessibilityState.disabled).toBeTruthy()
    })

    it('enables button when form is filled without errors', async () => {
        const user = userEvent.setup();

        render(
            <AppContainer />
        )
        
        await goGoDetailsScreen()
        
        await act(async () => {
            await user.type(screen.getByTestId('text-input.fullName'), 'Joe Doe')
            await user.type(screen.getByTestId('text-input.email'), 'maciek@test.pl')
            await user.type(screen.getByTestId('text-input.adress'), 'Testowa 1')
            await user.type(screen.getByTestId('text-input.city'), 'Wrocław')
            await user.type(screen.getByTestId('text-input.state'), 'Polska')
            await user.type(screen.getByTestId('text-input.zipcode'), '00-000')
        })

        expect(screen.getByTestId('button.viewSummary').props.accessibilityState.disabled).toBeFalsy()
    })

    it('moves to the summary screen when form is valid and view summary button is pressed', async () => {
        const user = userEvent.setup();

        render(
            <AppContainer />
        )
        
        await goGoDetailsScreen()
        
        await act(async () => {
            await user.type(screen.getByTestId('text-input.fullName'), 'Joe Doe')
            await user.type(screen.getByTestId('text-input.email'), 'maciek@test.pl')
            await user.type(screen.getByTestId('text-input.adress'), 'Testowa 1')
            await user.type(screen.getByTestId('text-input.city'), 'Wrocław')
            await user.type(screen.getByTestId('text-input.state'), 'Polska')
            await user.type(screen.getByTestId('text-input.zipcode'), '00-000')
            
            await user.press(screen.getByText('View summary'))
        })
        
        expect(screen.getByText('Summary Screen')).toBeOnTheScreen()
    })
})