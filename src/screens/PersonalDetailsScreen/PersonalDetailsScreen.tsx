import {Text, TextInput, View} from 'react-native'
import {Controller, useController, useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Menu from '@/components/Menu'
import {Button} from '@/components'

const userDetailsSchema = yup.object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    adress: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipcode: yup.number().required(),
})

interface InputProps {
    name: string;
    control: any;
}

const Input = ({
    name,
    control
}: InputProps) => {
    return (
        <View style={{}}>
            <View>
                <Text>{name}</Text>
            </View>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder={name}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name={name}
            />
            <View>
                <Text></Text>
            </View>
        </View>
    )
}

function PersonalDetailsScreen() {
    const {control, handleSubmit, formState} = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(userDetailsSchema),
    })

    console.log('render', formState)

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Personal Details Screen</Text>
            <Input name="fullName" control={control}/>
            <Input name="email" control={control}/>
            <Button label="Submit" onPress={handleSubmit((props) => console.log(props))}/>
            <Menu />
        </View>
    )
}

export default PersonalDetailsScreen