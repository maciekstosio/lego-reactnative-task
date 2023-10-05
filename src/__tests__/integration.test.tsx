import {render, screen, waitFor} from '@testing-library/react-native'
import AppContainer from '../AppContainer'

jest.useFakeTimers()

describe('integration test', () => {
    it('renders successfully ', () => {
        render(
            <AppContainer />
        )
    })
    
    it('renders random screen as default ', async () => {
        render(
            <AppContainer />
        )

        expect(screen.getByText('Random Screen')).toBeOnTheScreen()
    })

    it('loads carusel succesfully ', async () => {
        render(
            <AppContainer />
        )
        
        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
    })

    it('loads carusel succesfully ', async () => {
        render(
            <AppContainer />
        )
        
        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
        expect(screen.getByText('Random Screen tests')).toBeOnTheScreen()
    })

})