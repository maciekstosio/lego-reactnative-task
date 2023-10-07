import {useCallback, useState} from 'react'
import { Dimensions, SafeAreaView } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import {Text, View} from 'react-native-ui-lib'
import {useRandomMinifigs} from '@/services/useRandomMinifigs'
import {Card, MinifigCard, LoaderScreen, StateScreen, Button} from '@/components'
import {useNavigation} from '@/utils'

function RandomScreen() {
    const navigation = useNavigation()
    const {data, isLoading, isError, error, refetch} = useRandomMinifigs()
    const [selected, setSelected] = useState<number | null>(null)
    const {width, height} = Dimensions.get('window')

    const toggleSelected = useCallback((newState: number) => setSelected(currentState => {
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

    if (data === undefined || data.length === 0) {
        return (
            <StateScreen
                title="Unexpected error"
                subtitle="Unexpected server error occured"
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
                data={data}
                scrollAnimationDuration={500}
                mode="parallax"
                renderItem={({ index, item }) => (
                    <Card
                        key={item.id}
                        onPress={() => toggleSelected(index)}
                        checked={index === selected}
                        testID={item.id}
                    >
                        <MinifigCard minifig={item}/>
                    </Card>
                )}
            />
            <View paddingH-40>
                <Button
                    testID="chooseFigure"
                    label="Select"
                    disabled={selected === null}
                    onPress={() => navigation.navigate("PersonalDetails", {minifig: data[selected!]})}
                />
            </View>
        </SafeAreaView>
    );
}

export default RandomScreen