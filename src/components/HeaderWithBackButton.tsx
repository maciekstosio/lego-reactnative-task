import {View, ColorValue, Platform} from 'react-native'
import {useNavigation} from '@/utils'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Icon, {IconProps} from './Icon'

interface HeaderWithBackButtonProps {
    backgroundColor?: ColorValue;
    iconName?:  IconProps['name'];
}

const HeaderWithBackButton = ({
    backgroundColor,
    iconName = 'close'
}: HeaderWithBackButtonProps) => {
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()

    return (
        <View style={{
            padding: 10,
            paddingTop: Platform.OS === 'ios' ? 10 : insets.top + 10,
            justifyContent: 'center',
            backgroundColor: backgroundColor,
        }}>
            <Icon name={iconName} size={34} onPress={navigation.goBack}/>
        </View>
    )
}

export default HeaderWithBackButton