import {RootStackParamList} from '@/AppContainer'
import {RouteProp, useNavigation as useNavigationBase, useRoute as useRouteBase} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

export const useNavigation = useNavigationBase<NativeStackNavigationProp<RootStackParamList>>
export const useRoute = <T extends keyof RootStackParamList>() => useRouteBase<RouteProp<RootStackParamList, T>>()