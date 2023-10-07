import {Colors} from 'react-native-ui-lib'

export const legoRed = '#e3000b'
export const legoYellow = '#ffed00'


const AppColors = {
    light: {
        primary: legoRed,
        text: Colors.grey10,
        background: legoYellow,
        card: 'rgb(255, 255, 255)',
        border: 'rgb(216, 216, 216)',
        error: Colors.red30,
        overlay: Colors.rgba(Colors.grey80, 0.3),
        buttonText: Colors.white,
        buttonIcon: Colors.white,
        $textPrimary: legoRed, // Override for StateManager and Button
        $backgroundPrimaryHeavy: legoRed, // Override buttons
    },
    dark: {
        primary: legoRed,
        text: Colors.grey10,
        background: legoYellow,
        card: 'rgb(255, 255, 255)',
        border: 'rgb(216, 216, 216)',
        error: Colors.red30,
        overlay: Colors.rgba(Colors.grey80, 0.3),
        buttonText: Colors.white,
        buttonIcon: Colors.white,
        $textPrimary: legoRed, // Override for StateManager and Button
        $backgroundPrimaryHeavy: legoRed, // Override buttons
    }
}

Colors.loadSchemes(AppColors)

export const NavigationColors = {
    dark: false,
    colors: {
        primary: Colors.primary,
        background: Colors.background,
        card: Colors.card,
        text: Colors.text,
        border: Colors.border,
        notification: Colors.error,
    },
};
