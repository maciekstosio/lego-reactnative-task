import { Image as ExpoImage } from 'expo-image';
import ImagePlaceholder from './ImagePlaceholder'

export interface ImageProps {
    url?: string;
}

export default ({url}: ImageProps) => {
    if (!url) {
        return <ImagePlaceholder />
    }

    return (
        <ExpoImage
            style={{
                flex: 1,
                width: '100%',
            }}
            testID={`image.${url}`}
            contentFit="contain"
            source={url}
        />
    )
}