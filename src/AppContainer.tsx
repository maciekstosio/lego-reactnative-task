import {QueryClient, QueryClientProvider} from 'react-query'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {PersonalDetailsScreen, RandomScreen, SummaryScreen} from '@/screens'

export type RootStackParamList = {
    PersonalDetails: undefined
    Random: undefined
    Summary: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const queryClient = new QueryClient()

export default function AppRouting() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Random'>
                    <Stack.Screen name="Random" component={RandomScreen} />
                    <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
                    <Stack.Screen name="Summary" component={SummaryScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    )
}

