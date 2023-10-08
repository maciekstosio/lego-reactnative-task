import {Text, View} from 'react-native-ui-lib'
import {Minifig} from '@/types'
import Image from './Image'

interface MinifigCardProps {
    minifig: Minifig;
}

const MinifigCard = ({minifig}: MinifigCardProps) => (
    <View
        testID={`minifig.${minifig.id}`}
        centerH
    >
        <View marginB-20 width={200} height={200}>
            <Image url={minifig.image} />
        </View>
        <Text text50M marginB-20 center>
            {minifig.name}
        </Text>
    </View>
)

export default MinifigCard
