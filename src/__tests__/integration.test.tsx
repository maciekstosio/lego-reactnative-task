import {render, screen} from '@testing-library/react-native'
import AppRouting from '../AppRouting'

describe('integration test', () => {
    it('renders successfully ', () => {
        render(
            <AppRouting />
        )
    })
    
    it('renders details screen as default ', () => {
        render(
            <AppRouting />
        )

        expect(screen.getByText('Personal Details Screen')).toBeOnTheScreen()
    })
})