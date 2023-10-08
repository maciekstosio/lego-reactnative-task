import {ScrollView, View} from 'react-native'
import {Text} from 'react-native-ui-lib'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {LoaderScreen, MinifigCard, StateScreen, Image, Card, Button, HeaderWithBackButton} from '@/components'
import {useNavigation, useRoute} from '@/utils'
import {usePartsForMinifig} from '@/services'
import {Part} from '@/types'

interface PartCardProps {
    part: Part;
}

const PartCard = ({
    part,
}: PartCardProps) => (
    <View style={{
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10
    }}>
        <View style={{width: 50, height: 50, marginRight: 10}}>
            <Image url={part.image} />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text text80M numberOfLines={1}>{part.name}</Text>
            <Text numberOfLines={1}>{part.id}</Text>
        </View>
    </View>
)
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