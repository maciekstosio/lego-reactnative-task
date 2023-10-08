import {Platform} from 'react-native'
import {Text} from 'react-native-ui-lib'

export interface HeaderProps {
    children: string;
}

const Header = ({
    children,
}: HeaderProps) => (
    <Text
        text50M
        center
        style={{marginVertical: Platform.OS === 'ios' ? 20 : 40}}
    >
        {children}
    </Text>
)

export default Header