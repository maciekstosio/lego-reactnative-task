import {Ionicons} from '@expo/vector-icons'

export interface IconProps {
    size?: number;
    name?:  React.ComponentProps<typeof Ionicons>['name'];
    onPress?: () => void;
}

const Icon = ({
    name,
    onPress,
    size = 34,
}: IconProps) => <Ionicons name={name} size={size} onPress={onPress}/>

export default Icon