import {QueryClient, QueryClientProvider} from 'react-query'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {PersonalDetailsScreen, RandomScreen, SummaryScreen, WebViewModal} from '@/screens'
import {NavigationColors} from './utils/theme'
import {Minifig, UserDetails} from './types'

export type RootStackParamList = {
    Random: undefined
    PersonalDetails: {
        minifig: Minifig;
    }
    Summary: {
        minifig: Minifig;
        userDetails: UserDetails;
    },
    WebView: {
        url: string;
    }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const queryClient = new QueryClient()

export default function AppRouting() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer theme={NavigationColors}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName='Random'
                >
                    <Stack.Screen name="Random" component={RandomScreen} />
                    <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
                    <Stack.Screen name="Summary" component={SummaryScreen} />
                    <Stack.Screen name="WebView" component={WebViewModal} options={{presentation: 'modal'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    )
}
