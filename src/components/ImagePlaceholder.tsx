import {View} from 'react-native'
import Icon from './Icon'

export default () => (
    <View
        style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Icon name='camera' />
    </View>
)