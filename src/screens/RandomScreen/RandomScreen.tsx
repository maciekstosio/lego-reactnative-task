import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Menu from '../../components/Menu'
import {useState} from 'react'

function RandomScreen() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const width = Dimensions.get('window').width;
    
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={setCurrentIndex}
                testID={`randomCarousel.selected_${currentIndex}`}
                mode="parallax"

                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
            <Text>Random Screen</Text>
            <Menu />
        </View>
    );
}

export default RandomScreen