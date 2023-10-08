

import {View} from 'react-native'
import {Text} from 'react-native-ui-lib'

export interface TextErrorProps {
    children: string;
}

const TextError = ({
    children,
}: TextErrorProps) => (
    <View>
        <Text error marginT-5>{children}</Text>
    </View>
)

export default TextError