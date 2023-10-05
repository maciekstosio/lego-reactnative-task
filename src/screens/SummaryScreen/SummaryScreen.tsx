import {Text, View} from 'react-native'
import Menu from '../../components/Menu'

function RandomScreen() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Summary Screen</Text>
            <Menu />
        </View>
    )
}

export default RandomScreen