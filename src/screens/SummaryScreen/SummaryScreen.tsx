import {ScrollView, View} from 'react-native'
import {Text} from 'react-native-ui-lib'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {LoaderScreen, MinifigCard, StateScreen, PartCard, Button, HeaderWithBackButton, TextError} from '@/components'
import {useNavigation, useRoute} from '@/utils'
import {mutatePlaceOrder, usePartsForMinifig} from '@/services'

function SummaryScreen() {
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()
    const {params: {minifig, userDetails}} = useRoute<'Summary'>()
    const {data, isLoading: isLoadingParts, isError: isPartsError, refetch: refetchParts} = usePartsForMinifig(minifig.id)
    const {mutate, isLoading: isLoadingPlaceOrder, isError: isPlaceOrderError} = mutatePlaceOrder()

    if (isLoadingParts || isLoadingPlaceOrder) {
        return (
            <View style={{backgroundColor: "#fff", flex: 1}}>
                <LoaderScreen />
            </View>
        )
    }

    if (isPartsError || data === undefined) {
        return (
            <View style={{backgroundColor: "#fff", flex: 1}}>
                <StateScreen
                    title="Unexpected error"
                    subtitle="Unexpected network error occured when fetching parts"
                    buttonLabel="Try again"
                    onPress={refetchParts}
                />
            </View>
        )
    }

    const postOrder = () => {
        mutate({
            minifig_id: minifig.id,
            parts_ids: data.map(part => part.id),
            userDetails,
        }, {
            onSuccess: () => {      
                navigation.popToTop()
            }
        })
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
                    {isPlaceOrderError && (
                            <View>
                                <Text error marginT-10 marginB-10 center>Error while placing an order, try again</Text>
                            </View>
                    )}
                    <Button
                        testID="submitForm"
                        label="Submit"
                        onPress={postOrder}
                    />
                </View>
        </ScrollView>
    )
}

export default SummaryScreen