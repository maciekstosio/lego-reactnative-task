import {View} from 'react-native'
import {Text} from 'react-native-ui-lib'
import {Part} from '@/types'
import Image from './Image'

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
        padding: 10,
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

export default PartCard