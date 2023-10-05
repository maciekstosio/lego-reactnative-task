import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {PersonalDetailsScreen, RandomScreen, SummaryScreen} from './screens'

export type RootStackParamList = {
    PersonalDetails: undefined
    Random: undefined
    Summary: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppRouting() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='PersonalDetails'>
                <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
                <Stack.Screen name="Random" component={RandomScreen} />
                <Stack.Screen name="Summary" component={SummaryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

