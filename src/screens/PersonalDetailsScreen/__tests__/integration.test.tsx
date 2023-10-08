import {act, fireEvent, render, screen, userEvent, waitFor, waitForElementToBeRemoved} from '@testing-library/react-native'
import AppContainer from '@/AppContainer'
import getMinifigsResponse from '@/utils/test/__mocks__/getMinifigsResponse.json'
import getPartForMinifig from '@/utils/test/__mocks__/getPartForMinifig.json'

jest.useFakeTimers()

const fetchMock = require('fetch-mock-jest')

describe('personal details screen integration test', () => {
    const goGoDetailsScreen = async () => {
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        fireEvent(screen.getByText('Hermione Granger'), 'press')
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
        fetchMock.getOnce(/api\/v3\/lego\/minifigs\/.*\/parts/, getPartForMinifig)
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
        
        expect(screen.getByText('SUMMARY')).toBeOnTheScreen()
    })
})