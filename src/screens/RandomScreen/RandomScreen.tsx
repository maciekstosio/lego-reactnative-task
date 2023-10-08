import {useCallback, useState} from 'react'
import { Dimensions, Platform, SafeAreaView } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import {Text, View} from 'react-native-ui-lib'
import {useRandomMinifigs} from '@/services/useRandomMinifigs'
import {Card, MinifigCard, LoaderScreen, StateScreen, Button} from '@/components'
import {useNavigation} from '@/utils'
import Header from '@/components/Header'

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
            <Header>CHOOSE YOUR MINIFIG</Header>
            <Carousel
                loop
                width={width}
                height={height * (Platform.OS == 'ios' ? 0.5 : 0.6)}
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
                        <Button
                            testID={`showDetails.${item.id}`}
                            onPress={() => navigation.navigate('WebView', {url: item.url})}
                            label="Show details"
                        />
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