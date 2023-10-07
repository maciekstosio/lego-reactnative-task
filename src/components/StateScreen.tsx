import {StateScreen as RNUIStateScreen} from 'react-native-ui-lib';

interface StateScreenProps {
    title: string;
    subtitle?: string;
    buttonLabel?: string;
    onPress?: () => void;
}

const StateScreen = ({
    title,
    subtitle,
    buttonLabel,
    onPress
}: StateScreenProps) => (
    <RNUIStateScreen
        title={title}
        subtitle={subtitle}
        ctaLabel={buttonLabel}
        onCtaPress={onPress}
    />
)

export default StateScreen