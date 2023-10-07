import {useCallback, useState} from 'react'
import { Dimensions, SafeAreaView } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import {Text, View} from 'react-native-ui-lib'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '@/AppContainer'
import {useRandomMinifigs} from '@/services/useRandomMinifigs'
import {Card, MinifigCard, LoaderScreen, StateScreen, Button} from '@/components'

function RandomScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const {data, isLoading, isError, error, refetch} = useRandomMinifigs()
    const [selected, setSelected] = useState<string | null>(null)
    const {width, height} = Dimensions.get('window')
    
    const toggleSelected = useCallback((newState: string) => setSelected(currentState => {
        if (currentState === newState) {
            return null
        }
    
        return newState
    }), [])

    if (isLoading) {
        return <LoaderScreen />
    }

    if (isError) {
        return (
            <StateScreen
                title="Unexpected error"
                subtitle="Unexpected network error occured"
                buttonLabel="Try again"
                onPress={refetch}
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-evenly' }}>
            <Text text50M center>CHOOSE YOUR MINIFIG</Text>
            <Carousel
                loop
                width={width}
                height={height / 2}
                data={data ?? []}
                scrollAnimationDuration={500}
                mode="parallax"
                renderItem={({ item }) => (
                    <Card
                        key={item.id}
                        onPress={() => toggleSelected(item.id)}
                        checked={item.id === selected}
                        testID={item.id}
                    >
                        <MinifigCard minifig={item}/>
                    </Card>
                )}
            />
            <View paddingH-40>
                <Button
                    testID="chooseButton"
                    label="Select"
                    disabled={selected === null}
                    onPress={() => navigation.navigate("PersonalDetails")}
                />
            </View>
        </SafeAreaView>
    );
}

export default RandomScreen