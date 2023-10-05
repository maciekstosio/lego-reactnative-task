import {Text, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '@/AppContainer'

const Menu = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}><Text>PersonalDetails</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Random')}><Text>Random</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Summary')}><Text>Summary</Text></TouchableOpacity>
        </>
    )
}

export default Menu