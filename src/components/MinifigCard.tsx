import {Text, View} from 'react-native-ui-lib'
import {Minifig} from '@/types'
import Image from './Image'

interface MinifigCardProps {
    minifig: Minifig;
}

const MinifigCard = ({minifig}: MinifigCardProps) => (
    <View
        testID={`minifig.${minifig.id}`}
        flex
        centerH
    >
        <View marginB-20 width={200} height={200}>
            <Image url={minifig.image} />
        </View>
        <Text style={{ textAlign: 'center', fontSize: 30 }}>
            {minifig.name}
        </Text>
    </View>
)

export default MinifigCard
