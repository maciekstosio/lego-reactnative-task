import {View, ColorValue} from 'react-native'
import {useNavigation} from '@/utils'
import {Ionicons} from '@expo/vector-icons'

interface HeaderWithBackButtonProps {
    backgroundColor?: ColorValue;
    iconName?:  React.ComponentProps<typeof Ionicons>['name'];
}

const HeaderWithBackButton = ({
    backgroundColor,
    iconName = 'close'
}: HeaderWithBackButtonProps) => {
    const navigation = useNavigation()

    return (
        <View style={{
            height: 50,
            paddingHorizontal: 5,
            justifyContent: 'center',
            backgroundColor: backgroundColor,
        }}>
            <Ionicons name={iconName} size={34} onPress={navigation.goBack}/>
        </View>
    )
}

export default HeaderWithBackButton