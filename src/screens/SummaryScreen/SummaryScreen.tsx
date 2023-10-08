import {ScrollView, View} from 'react-native'
import {Text} from 'react-native-ui-lib'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {LoaderScreen, MinifigCard, StateScreen, PartCard, Button, HeaderWithBackButton} from '@/components'
import {useNavigation, useRoute} from '@/utils'
import {usePartsForMinifig} from '@/services'

function SummaryScreen() {
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()
    const {params: {minifig, userDetails}} = useRoute<'Summary'>()
    const {data, isLoading, isError, refetch} = usePartsForMinifig(minifig.id)

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
        <ScrollView style={{flex: 1, padding: 20, paddingTop: insets.top, backgroundColor: "#fff"}}>
                <HeaderWithBackButton />
                <Text text50M marginB-20 center>SUMMARY</Text>
                <MinifigCard
                    minifig={minifig}
                />
                <View style={{flex: 1, marginTop: 10}}>
                    {data.map((part: any) => <PartCard key={part.id} part={part} />)}
                </View>
                <View style={{paddingTop: 20, paddingBottom: insets.bottom + 75}}>
                    <Button
                        testID="submitForm"
                        label="Submit"
                        onPress={navigation.popToTop}
                    />
                </View>
        </ScrollView>
    )
}

export default SummaryScreen