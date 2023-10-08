import {View} from 'react-native'
import {WebView} from 'react-native-webview'
import {useRoute} from '@/utils'
import {HeaderWithBackButton} from '@/components'

function WebViewModal() {
    const {params: {url}} = useRoute<'WebView'>()

    return (
        <View style={{flex: 1}}>
            <HeaderWithBackButton backgroundColor="#fff" />
            <WebView
                testID="web-view"
                style={{flex: 1}}
                source={{ uri: url}}
            />
        </View>
    )
}

export default WebViewModal