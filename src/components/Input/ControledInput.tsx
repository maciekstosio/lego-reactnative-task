import {TextInput, TextInputProps} from 'react-native'
import {Control, FieldPath, FieldValues, useController} from 'react-hook-form'
import {View, Text} from 'react-native-ui-lib'
import TextError from '../TextError'

interface InputProps<T extends FieldValues> {
    label: string,
    name: FieldPath<T>;
    control: Control<T, any>;
    keyboardType?: TextInputProps['keyboardType'],
    autoCapitalize?: TextInputProps['autoCapitalize'],
    autoComplete?: TextInputProps['autoComplete'],
}

const ControledInput = <T extends FieldValues>({
    label,
    name,
    control,
    keyboardType,
    autoCapitalize,
    autoComplete
}: InputProps<T>) => {
    const {field, formState: {errors}} = useController({
        name,
        control,
    })

    return (
        <View style={{marginBottom: 5}}>
            <Text text80M marginB-5>{label}</Text>
            <TextInput
                style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    height: 40,
                    borderRadius: 5,
                }}
                placeholder={label}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoComplete={autoComplete}
                testID={`text-input.${name}`}
            />
            <TextError>{errors?.[name]?.message as string}</TextError>
        </View>
    )
}

export default ControledInput