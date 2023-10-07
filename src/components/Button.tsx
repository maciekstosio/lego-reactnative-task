import {Button as RNUIButton} from 'react-native-ui-lib'

interface ButtonProps {
    label: string;
    disabled?: boolean;
    testID?: string;
    onPress?: () => void;
}

const Button = ({
    label,
    disabled,
    testID,
    onPress,
}: ButtonProps) => (
    <RNUIButton
        testID={`button.${testID}`}
        label={label}
        disabled={disabled}
        enableShadow
        onPress={onPress}
    />
)

export default Button