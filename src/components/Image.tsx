import { Image as ExpoImage } from 'expo-image';

export interface ImageProps {
    url: string;
}

export default ({url}: ImageProps) => {
    return (
        <ExpoImage
            style={{
                flex: 1,
                width: '100%',
            }}
            contentFit="contain"
            source={url}
        />
    )
}