import {Dimensions, Keyboard, TouchableWithoutFeedback} from 'react-native'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {Button, ControledInput, HeaderWithBackButton} from '@/components'
import {View, Text, KeyboardAwareScrollView} from 'react-native-ui-lib'
import {UserDetails, userDetailsSchema} from '@/types'
import {useNavigation, useRoute} from '@/utils'
import Header from '@/components/Header'

function PersonalDetailsScreen() {
    const {height} = Dimensions.get('window')
    const {params: {minifig}} = useRoute<'PersonalDetails'>()
    const navigation = useNavigation()

    const {control, handleSubmit, formState: {isValid}} = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            adress: '',
            city: '',
            state: '',
            zipcode: ''
        },
        mode: 'onBlur',
        reValidateMode: 'onChange',
        resolver: yupResolver(userDetailsSchema),
    })

    const onSubmit = (userDetails: UserDetails) => navigation.navigate('Summary', {
        minifig,
        userDetails,
    })

    return (
        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <View 
                    style={{
                        flex: 1,
                        padding: 20,
                        justifyContent: 'space-evenly',
                        minHeight: height
                    }}
                >
                    <Header>PERSONAL DETAILS</Header>
                    <View>
                        <ControledInput
                            label="Full name"
                            name="fullName"
                            autoComplete="name"
                            control={control}
                        />
                        <ControledInput
                            label="Email"
                            name="email"
                            control={control}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                        <ControledInput
                            label="Adress"
                            name="adress"
                            control={control}
                            autoComplete="address-line1"
                        />
                        <ControledInput
                            label="City"
                            name="city"
                            control={control}
                        />
                        <ControledInput
                            label="State"
                            name="state"
                            control={control}
                        />
                        <ControledInput
                            label="Zip code"
                            name="zipcode"
                            control={control}
                            autoComplete="postal-code"
                        />
                    </View>
                    <Button
                        testID="viewSummary"
                        label="View summary"
                        disabled={!isValid}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    )
}

export default PersonalDetailsScreen