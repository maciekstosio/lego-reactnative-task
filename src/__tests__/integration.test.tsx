import {render, screen, waitFor} from '@testing-library/react-native'
import AppRouting from '../AppRouting'

jest.useFakeTimers()

describe('integration test', () => {
    it('renders successfully ', () => {
        render(
            <AppRouting />
        )
    })
    
    it('renders random screen as default ', async () => {
        render(
            <AppRouting />
        )

        expect(screen.getByText('Random Screen')).toBeOnTheScreen()
    })

    it('loads carusel succesfully ', async () => {
        render(
            <AppRouting />
        )
        
        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
    })

    it('loads carusel succesfully ', async () => {
        render(
            <AppRouting />
        )
        
        await waitFor(() => screen.getByTestId("__CAROUSEL_ITEM_0_READY__"));
        
    })
})